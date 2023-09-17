const router = require("express").Router();
const Medicalreports = require("../model/medicalReports"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed

// Add a new Medicalreports
router.post("/new", async (req, res) => {
  try {
    console.log(req.body.data.patientId)
    const medicalreports = new Medicalreports({ report: req.body.data.report });
    await medicalreports.save();

    // Find the patient by ID
    const patient = await Patients.findById(req.body.data.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Push the new prescription's ID into the patient's prescription field
    console.log(medicalreports._id.toString());
    patient.medicalReport.push(medicalreports._id.toString());

    // Save the updated patient
    await patient.save();

    res.status(201).json(medicalreports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Medicalreports
router.get("/getall", async (req, res) => {
  try {
    const medicalreports = await Medicalreports.find();
    res.json(medicalreports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one Medicalreports by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const medicalreports = await Medicalreports.findByIdAndDelete(
      req.params.id
    );
    if (!medicalreports) {
      return res.status(404).json({ error: "Medicalreports not found" });
    }
    res.json({ message: "Medicalreports deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
