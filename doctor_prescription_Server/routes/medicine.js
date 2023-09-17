const router = require("express").Router();
const Medicine = require("../model/medicine"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed

// Add a new Medicalreports
router.post("/new", async (req, res) => {
  try {
    console.log(req.body.data.patientId)
    const medicine = new Medicine({ report: req.body.data.report });
    await medicine.save();

    // Find the patient by ID
    const patient = await Patients.findById(req.body.data.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Push the new prescription's ID into the patient's prescription field
    console.log(medicine._id.toString());
    patient.medicalReport.push(medicine._id.toString());

    // Save the updated patient
    await patient.save();

    res.status(201).json(medicalreports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Medicine
router.get("/getall", async (req, res) => {
  try {
    const medicine = await Medicine.find();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one Medicine by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(
      req.params.id
    );
    if (!medicine) {
      return res.status(404).json({ error: "medicine not found" });
    }
    res.json({ message: "medicine deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
