const Pharmaceutical = require("../model/pharmaceutical"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const Prescription = require("../model/prescription"); // Make sure to adjust the path as needed

const router = require("express").Router();
router.get("/getcount", async (req, res) => {
  try {
    const pharmaceuticalCount = await Pharmaceutical.count();
    const patientsCount = await Patients.count();
    const PrescriptionCount = await Prescription.count();
    res.json({
      pharmaceuticalCount: pharmaceuticalCount,
      patientsCount: patientsCount,
      PrescriptionCount: PrescriptionCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
