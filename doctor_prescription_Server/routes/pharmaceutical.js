const router = require("express").Router();

const Pharmaceutical = require("../model/pharmaceutical"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const SystemSetting = require("../model/systemSetting"); // Make sure to adjust the path as needed
const fs = require("fs");

// Add a new category
router.post("/new", async (req, res) => {
  try {
    const pharmaceuticalData = req.body;
    console.log(pharmaceuticalData);
    if (req.body.intaketime === "") {
      delete pharmaceuticalData.intaketime;
    }
    const pharmaceutical = new Pharmaceutical(pharmaceuticalData);
    await pharmaceutical.save();
    res.status(201).json(pharmaceutical);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const pharmaceuticalData = req.body;
    console.log(pharmaceuticalData);
    if (req.body.intaketime === "") {
      delete pharmaceuticalData.intaketime;
    }
    const pharmaceutical = await Pharmaceutical.findByIdAndUpdate(
      req.body.id,
      pharmaceuticalData,
      {
        new: true,
      }
    );
    res.status(201).json(pharmaceutical);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/getall", async (req, res) => {
  try {
    const pharmaceutical = await Pharmaceutical.find({ active: { $ne: false } })
      .populate("category")
      .populate("intaketime")
      .sort({ name: 1 }); // 1 for ascending order, -1 for descending order

    // console.log(pharmaceutical)
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/import", async (req, res) => {
  try {
    // Replace 'your-csv-file.csv' with the path to your CSV file
    const csvFilePath = "pharmacy.csv";
    console.log(process.cwd());
    // Read the CSV file
    const data = fs.readFileSync(csvFilePath, "utf8");

    // Split the CSV data by line
    const namesArray = data.split("\n");

    for (const name of namesArray) {
      // Remove leading/trailing whitespace and empty lines
      const trimmedName = name.trim();
      if (trimmedName.length === 0) {
        continue;
      }

      // Create a new Pharmaceutical document with the name field
      const pharmaceutical = new Pharmaceutical({ name: trimmedName });

      try {
        // Save the pharmaceutical document to the database
        await pharmaceutical.save();
        console.log(`Added: ${trimmedName}`);
      } catch (error) {
        console.error(`Error adding ${trimmedName}: ${error.message}`);
      }
    }

    console.log("Import completed.");
    await SystemSetting.findOneAndUpdate({}, { pharmaceuticalLoded: true });
    res.status(200).json({ message: "Import completed." });
  } catch (error) {
    console.error(`Error reading CSV file: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getbyname/:searchName?", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const pharmaceutical = await Pharmaceutical.find({
      name: { $regex: searchName, $options: "i" },
    })
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getbyname/", async (req, res) => {
  try {
    const pharmaceutical = await Pharmaceutical.find({    })
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get one Pharmaceutical by ID
router.get("/getone/:id", async (req, res) => {
  try {
    const pharmaceutical = await Pharmaceutical.findById(req.params.id);
    if (!pharmaceutical) {
      return res.status(404).json({ error: "Pharmaceutical not found" });
    }
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit one Pharmaceutical by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const pharmaceutical = await Pharmaceutical.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!pharmaceutical) {
      return res.status(404).json({ error: "Pharmaceutical not found" });
    }
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one Pharmaceutical by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const pharmaceutical = await Pharmaceutical.findByIdAndUpdate(
      req.params.id,
      { active: false }
    );
    if (!pharmaceutical) {
      return res.status(404).json({ error: "Pharmaceutical not found" });
    }
    res.json({ message: "Pharmaceutical deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
