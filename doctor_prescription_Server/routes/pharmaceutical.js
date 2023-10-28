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

router.post("/favorite", async (req, res) => {
  try {
    console.log(req.body);
    const selectedPharmaceutical = await Pharmaceutical.findById(req.body.id);

    if (!selectedPharmaceutical) {
      // If no pharmaceutical with the provided ID is found, return an error response.
      return res.status(404).json({ error: "Pharmaceutical not found" });
    }
    let updatedFavoriteStatus = true;
    if (selectedPharmaceutical.favorite) {
      updatedFavoriteStatus = false;
    }
    const pharmaceutical = await Pharmaceutical.findByIdAndUpdate(
      req.body.id,
      {
        favorite: updatedFavoriteStatus,
      },
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
      .sort({ favorite: -1, name: 1 });

    // console.log(pharmaceutical)
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/import", async (req, res) => {
  try {
    // Replace 'your-json-file.json' with the path to your JSON file
    const jsonFilePath = "pharmacydataset.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const pharmaceuticalsArray = JSON.parse(jsonData);

    for (const item of pharmaceuticalsArray) {
      // Create a new Pharmaceutical document with the necessary fields
      const pharmaceutical = new Pharmaceutical({
        name: item.text, // Assuming 'text' field contains the name
        midScapeId: item.id,
        midScapeval: item.val,
        midScapetype: item.type,
        midScapeHasInteractions: item.has_interactions,
      });

      try {
        // Save the pharmaceutical document to the database
        await pharmaceutical.save();
        console.log(`Added: ${item.text}`);
      } catch (error) {
        console.error(`Error adding ${item.text}: ${error.message}`);
      }
    }

    console.log("Import completed.");
    await SystemSetting.findOneAndUpdate({}, { pharmaceuticalLoded: true });
    res.status(200).json({ message: "Import completed." });
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getbyname/:searchName", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const pharmaceutical = await Pharmaceutical.find({
      name: { $regex: searchName, $options: "i" },
    });
    res.json(pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getbyname/", async (req, res) => {
  try {
    const pharmaceutical = await Pharmaceutical.find({});
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
