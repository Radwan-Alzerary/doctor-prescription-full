const router = require("express").Router();
const SurgicalProceduresType = require("../model/surgicalProceduresType");

// Create a new SurgicalProceduresType
router.post("/types", async (req, res) => {
    try {
      const newType = await SurgicalProceduresType.create(req.body);
      res.status(201).json(newType);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get a list of all SurgicalProceduresTypes
  router.get("/types", async (req, res) => {
    try {
      const types = await SurgicalProceduresType.find({name: { $ne:''}});
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a single SurgicalProceduresType by ID
  router.get("/types/:id", async (req, res) => {
    try {
      const type = await SurgicalProceduresType.findById(req.params.id);
      if (!type) {
        return res.status(404).json({ error: "Type not found" });
      }
      res.json(type);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a SurgicalProceduresType by ID
  router.put("/types/:id", async (req, res) => {
    try {
      const updatedType = await SurgicalProceduresType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedType) {
        return res.status(404).json({ error: "Type not found" });
      }
      res.json(updatedType);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete a SurgicalProceduresType by ID
  router.delete("/types/:id", async (req, res) => {
    try {
      const deletedType = await SurgicalProceduresType.findByIdAndRemove(req.params.id);
      if (!deletedType) {
        return res.status(404).json({ error: "Type not found" });
      }
      res.json(deletedType);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
  