const router = require("express").Router();
const Visit = require("../model/visit"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed

// Add a new Medicalreports
router.post("/new", async (req, res) => {
  try {
    console.log(req.body.data.patientId);
    const visit = new Visit({
      chiefComplaint: req.body.data.chiefComplaint,
      dateOfVisit: req.body.data.dateOfVisit,
      investigation: req.body.data.investigation,
      diagnosis: req.body.data.diagnosis,
      CauseOfVisite: req.body.data.CauseOfVisite,
      management: req.body.data.management,
      PriorChronicTherapy: req.body.data.PriorChronicTherapy,
      type: req.body.data.type,
      priority: req.body.data.priority,

    });
    await visit.save();
    // Find the patient by ID
    const patient = await Patients.findById(req.body.data.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    patient.lastEditDate = Date.now();

    // Push the new prescription's ID into the patient's prescription field
    console.log(visit._id.toString());
    patient.visit.push(visit._id.toString());
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD string

    // Find the visitDate entry for today's date, if it exists
    const todayVisitDate = patient.visitDate.find(
      (visit) =>
        visit.date && visit.date.toISOString().split("T")[0] === currentDateStr
    );

    if (todayVisitDate) {
      if (todayVisitDate.visitReportCount) {
        todayVisitDate.visitReportCount += 1;
      } else {
        todayVisitDate.visitReportCount = 1;
      }
    } else {
      // Today's date is not in visitDate, so push it with initial counts
      patient.visitDate.push({
        date: currentDate,
        visitReportCount: 1,
      });
    }
    // Save the updated patient
    await patient.save();

    res.status(201).json(visit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Medicalreports
router.get("/getall", async (req, res) => {
  try {
    const visit = await Visit.find();
    res.json(visit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getone/:id", async (req, res) => {
  try {
    const medicalreports = await Visit.findById(req.params.id);
    res.json(medicalreports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/editone/", async (req, res) => {
  try {
    console.log(req.body);
    const medicalreports = await Visit.findByIdAndUpdate(req.body.id, {
      chiefComplaint: req.body.data.chiefComplaint,
      investigation: req.body.data.investigation,
      diagnosis: req.body.data.diagnosis,
      CauseOfVisite: req.body.data.CauseOfVisite,
      PriorChronicTherapy: req.body.data.PriorChronicTherapy,
      management: req.body.data.management,
      type: req.body.data.type,
      priority: req.body.data.priority,
    });

    res.json(medicalreports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one Medicalreports by ID

// Delete one Medicalreports by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) {
      return res.status(404).json({ error: "visit not found" });
    }
    res.json({ message: "visit deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
