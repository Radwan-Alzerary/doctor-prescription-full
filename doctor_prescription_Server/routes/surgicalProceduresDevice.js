const router = require("express").Router();
const SurgicalProceduresDevice = require("../model/surgicalProceduresDevice");
// Create a new SurgicalProceduresDevice
router.post("/devices", async (req, res) => {
    try {
      const newDevice = await SurgicalProceduresDevice.create(req.body);
      res.status(201).json(newDevice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get a list of all SurgicalProceduresDevices
  router.get("/devices", async (req, res) => {
    try {
      const devices = await SurgicalProceduresDevice.find();
      res.json(devices);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a single SurgicalProceduresDevice by ID
  router.get("/devices/:id", async (req, res) => {
    try {
      const device = await SurgicalProceduresDevice.findById(req.params.id);
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
      res.json(device);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a SurgicalProceduresDevice by ID
  router.put("/devices/:id", async (req, res) => {
    try {
      const updatedDevice = await SurgicalProceduresDevice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedDevice) {
        return res.status(404).json({ error: "Device not found" });
      }
      res.json(updatedDevice);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete a SurgicalProceduresDevice by ID
  router.delete("/devices/:id", async (req, res) => {
    try {
      const deletedDevice = await SurgicalProceduresDevice.findByIdAndRemove(req.params.id);
      if (!deletedDevice) {
        return res.status(404).json({ error: "Device not found" });
      }
      res.json(deletedDevice);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
  