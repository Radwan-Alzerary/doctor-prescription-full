const router = require("express").Router();

const InTakeTime = require("../model/intaketime"); // Make sure to adjust the path as needed

// Add a new InTakeTime
router.post("/new", async (req, res) => {
  try {
    const inTakeTime = new InTakeTime(req.body);
    await inTakeTime.save();
    res.status(201).json(inTakeTime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all InTakeTime
router.get("/getall", async (req, res) => {
  try {
    const inTakeTime = await InTakeTime.find();
    res.json(inTakeTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one InTakeTime by ID
router.get("/getone/:id", async (req, res) => {
  try {
    const inTakeTime = await InTakeTime.findById(req.params.id);
    if (!inTakeTime) {
      return res.status(404).json({ error: "inTakeTime not found" });
    }
    res.json(inTakeTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit one InTakeTime by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const inTakeTime = await InTakeTime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!inTakeTime) {
      return res.status(404).json({ error: "InTakeTime not found" });
    }
    res.json(inTakeTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one InTakeTime by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const inTakeTime = await InTakeTime.findByIdAndDelete(req.params.id);
    if (!inTakeTime) {
      return res.status(404).json({ error: "InTakeTime not found" });
    }
    res.json({ message: "inTakeTime deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
