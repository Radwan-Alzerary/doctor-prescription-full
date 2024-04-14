const router = require("express").Router();

const pharmaceuticalGroup = require("../model/pharmaceuticalGroup"); // Make sure to adjust the path as needed
const Pharmaceutical = require("../model/pharmaceutical"); // Make sure to adjust the path as needed

// Add a new category
router.post("/new", async (req, res) => {
  try {
    const PharmaceuticalGroup = new pharmaceuticalGroup(req.body);
    await PharmaceuticalGroup.save();
    res.status(201).json(PharmaceuticalGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/nested/", async (req, res) => {
  console.log(req.body)
  const { groupId } = req.body;
  const { pharmaceuticalId } = req.body;

  try {
    // Find the pharmaceutical group by ID
    const group = await pharmaceuticalGroup.findById(groupId._id);

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ message: "Pharmaceutical group not found" });
    }

    // Find the pharmaceutical by ID
    const pharmaceutical = await Pharmaceutical.findById(pharmaceuticalId);

    // Check if the pharmaceutical exists
    if (!pharmaceutical) {
      return res.status(404).json({ message: "Pharmaceutical not found" });
    }

    // Push the pharmaceutical to the group
    group.pharmaceutical.push(pharmaceutical);

    // Save the updated group
    await group.save();

    // Return success response
    res.status(200).json({ message: "Pharmaceutical added to group successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/removenested/", async (req, res) => {
  const { groupId } = req.body;
  const { pharmaceuticalId } = req.body;

  try {
    // Find the pharmaceutical group by ID
    const group = await pharmaceuticalGroup.findById(groupId);

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ message: "Pharmaceutical group not found" });
    }
    console.log(pharmaceuticalId)
    console.log(pharmaceuticalId)
    // Find the index of the pharmaceutical in the group
    const pharmaceuticalIndex = group.pharmaceutical.findIndex(item => item._id.toString() === pharmaceuticalId);

    // Check if the pharmaceutical exists in the group
    if (pharmaceuticalIndex === -1) {
      return res.status(404).json({ message: "Pharmaceutical not found in the group" });
    }

    // Remove the pharmaceutical from the group
    group.pharmaceutical.splice(pharmaceuticalIndex, 1);

    // Save the updated group
    await group.save();

    // Return success response
    res.status(200).json({ message: "Pharmaceutical removed from group successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all PharmaceuticalGroup
router.get("/getall", async (req, res) => {
  try {
    const PharmaceuticalGroup = await pharmaceuticalGroup.find().populate("pharmaceutical");
    res.json(PharmaceuticalGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one PharmaceuticalGroup by ID
router.get("/getone/:id", async (req, res) => {
  try {
    const PharmaceuticalGroup = await pharmaceuticalGroup.findById(req.params.id).populate("pharmaceutical");
    if (!PharmaceuticalGroup) {
      return res.status(404).json({ error: "PharmaceuticalGroup not found" });
    }
    res.json(PharmaceuticalGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit one category by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const PharmaceuticalGroup = await pharmaceuticalGroup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!PharmaceuticalGroup) {
      return res.status(404).json({ error: "PharmaceuticalGroup not found" });
    }
    res.json(PharmaceuticalGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one category by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const PharmaceuticalGroup = await pharmaceuticalGroup.findByIdAndDelete(req.params.id);
    if (!PharmaceuticalGroup) {
      return res.status(404).json({ error: "PharmaceuticalGroup not found" });
    }
    res.json({ message: "PharmaceuticalGroup deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
