const router = require("express").Router();
const SurgicalProceduresNarcosis = require("../model/surgicalProceduresNarcosis");

// Create a new SurgicalProceduresNarcosis
router.post("/narcosis", async (req, res) => {
    try {
      const newNarcosis = await SurgicalProceduresNarcosis.create(req.body);
      res.status(201).json(newNarcosis);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  
  // Get a list of all SurgicalProceduresNarcosis
  router.get("/narcosis", async (req, res) => {
    try {
      console.log("")
      const narcosisList = await SurgicalProceduresNarcosis.find({ name: { $ne: '' }});
      res.json(narcosisList);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a single SurgicalProceduresNarcosis by ID
  router.get("/narcosis/:id", async (req, res) => {
    try {
      const narcosis = await SurgicalProceduresNarcosis.findById(req.params.id);
      if (!narcosis) {
        return res.status(404).json({ error: "Narcosis not found" });
      }
      res.json(narcosis);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a SurgicalProceduresNarcosis by ID
  router.put("/narcosis/:id", async (req, res) => {
    try {
      const updatedNarcosis = await SurgicalProceduresNarcosis.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedNarcosis) {
        return res.status(404).json({ error: "Narcosis not found" });
      }
      res.json(updatedNarcosis);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete a SurgicalProceduresNarcosis by ID
  router.delete("/narcosis/:id", async (req, res) => {
    try {
      const deletedNarcosis = await SurgicalProceduresNarcosis.findByIdAndRemove(req.params.id);
      if (!deletedNarcosis) {
        return res.status(404).json({ error: "Narcosis not found" });
      }
      res.json(deletedNarcosis);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
  