const router = require("express").Router();
const SurgicalProcedures = require("../model/surgicalProcedures");

// Create a new SurgicalProceduresType
router.post("/", async (req, res) => {
  try {
    const SurgicalProcedures = await SurgicalProcedures.create(req.body);
    res.status(201).json(SurgicalProcedures);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a list of all SurgicalProceduresTypes
router.get("/", async (req, res) => {
  try {
    const SurgicalProcedures = await SurgicalProcedures.find();
    res.json(SurgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single SurgicalProceduresType by ID
router.get("/:id", async (req, res) => {
  try {
    const SurgicalProcedures = await SurgicalProcedures.findById(req.params.id);
    if (!SurgicalProcedures) {
      return res.status(404).json({ error: "SurgicalProcedures not found" });
    }
    res.json(SurgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a SurgicalProceduresType by ID
router.put("/:id", async (req, res) => {
  try {
    const SurgicalProcedures = await SurgicalProcedures.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!SurgicalProcedures) {
      return res.status(404).json({ error: "Type not found" });
    }
    res.json(SurgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a SurgicalProceduresType by ID
router.delete("/:id", async (req, res) => {
  try {
    const SurgicalProcedures = await SurgicalProcedures.findByIdAndRemove(
      req.params.id
    );
    if (!SurgicalProcedures) {
      return res.status(404).json({ error: "SurgicalProcedures not found" });
    }
    res.json(SurgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
