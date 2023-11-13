const router = require("express").Router();
const Labory = require("../model/labory"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed

// Add a new Medicalreports
router.post("/new", async (req, res) => {
  try {
    console.log(req.body.data.patientId);
    const labory = new Labory({ report: req.body.data.report });
    await labory.save();

    // Find the patient by ID
    const patient = await Patients.findById(req.body.data.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Push the new prescription's ID into the patient's prescription field
    console.log(labory._id.toString());
    patient.labory.push(labory._id.toString());
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD string

    // Find the visitDate entry for today's date, if it exists
    const todayVisitDate = patient.visitDate.find(
      (visit) =>
        visit.date && visit.date.toISOString().split("T")[0] === currentDateStr
    );

    if (todayVisitDate) {
      if (todayVisitDate.laboryReportCount) {
        todayVisitDate.laboryReportCount += 1;
      } else {
        todayVisitDate.laboryReportCount = 1;
      }
    } else {
      // Today's date is not in visitDate, so push it with initial counts
      patient.visitDate.push({
        date: currentDate,
        laboryReportCount: 1,
      });
    }
    // Save the updated patient
    await patient.save();

    res.status(201).json(labory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Medicalreports
router.get("/getall", async (req, res) => {
  try {
    const labory = await Labory.find();
    res.json(labory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getone/:id", async (req, res) => {
  try {
    const medicalreports = await Labory.findById(req.params.id);
    res.json(medicalreports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/editone/", async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.body)
    console.log(req.body)
    console.log(req.body)
    console.log(req.body)
    const medicalreports = await Labory.findByIdAndUpdate(req.body.id,{report : req.body.data.report});
    res.json(medicalreports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one Medicalreports by ID

// Delete one Medicalreports by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const labory = await Labory.findByIdAndDelete(req.params.id);
    if (!labory) {
      return res.status(404).json({ error: "labory not found" });
    }
    res.json({ message: "labory deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
