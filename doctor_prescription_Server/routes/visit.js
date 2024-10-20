const router = require("express").Router();
const Visit = require("../model/visit"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const systemSetting = require("../model/systemSetting");

// Add a new Medicalreports
router.post("/new", async (req, res) => {
  try {
    console.log(req.body.data.patientId);
    console.log(req.body.data.type);
    const setting = await systemSetting.findOne();
    let visitNumberOfDaysForFreeReview = new Date();
    if (req.body.type !== "مراجعة") {
      visitNumberOfDaysForFreeReview = visitNumberOfDaysForFreeReview.setDate(visitNumberOfDaysForFreeReview.getDate() + setting.finanical.visitNumberOfDaysForFreeReview);
    }
    console.log(visitNumberOfDaysForFreeReview)
    const visit = new Visit({
      freeVisitDate: visitNumberOfDaysForFreeReview,
      chiefComplaint: req.body.data.chiefComplaint,
      dateOfVisit: req.body.data.dateOfVisit,
      investigation: req.body.data.investigation,
      diagnosis: req.body.data.diagnosis,
      CauseOfVisite: req.body.data.CauseOfVisite,
      management: req.body.data.management,
      PriorChronicTherapy: req.body.data.PriorChronicTherapy,
      type: req.body.data.type,
      priority: req.body.data.priority,
      chronicTherapy: req.body.data.chronicTherapy,
      analysis: req.body.data.analysis,
      riskFactor: req.body.data.riskFactor,
      pastMedicalHistory: req.body.data.pastMedicalHistory,
      drugHistory: req.body.data.drugHistory,
      suspendedDx: req.body.data.suspendedDx,
      TotalAmount: req.body.data.TotalAmount,
      TheArrivingAmount: req.body.data.TheArrivingAmount,
      DateOfSecondvisit: req.body.data.DateOfSecondvisit,
      TypeOfExamination: req.body.data.TypeOfExamination,
      Notes: req.body.data.Notes,
      SessionPrice: req.body.data.SessionPrice,
      NumberOfMaxillaryImplants: req.body.data.NumberOfMaxillaryImplants,
      NumberOfMandibularImplants: req.body.data.NumberOfMandibularImplants,
    });
    await visit.save();
    // Find the patient by ID
    const patient = await Patients.findById(req.body.data.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    patient.lastEditDate = Date.now();
    patient.freeVisitDate = visitNumberOfDaysForFreeReview;
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

router.get("/history/:id", async (req, res) => {
  try {
    const medicalreports = await Patients.findById(req.params.id).populate("visit");
    res.json(medicalreports.visit);
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
      analysis: req.body.data.analysis,
      riskFactor: req.body.data.riskFactor,
      pastMedicalHistory: req.body.data.pastMedicalHistory,
      drugHistory: req.body.data.drugHistory,
      suspendedDx: req.body.data.suspendedDx,

      TotalAmount: req.body.data.TotalAmount,
      TheArrivingAmount: req.body.data.TheArrivingAmount,
      DateOfSecondvisit: req.body.data.DateOfSecondvisit,
      TypeOfExamination: req.body.data.TypeOfExamination,
      Notes: req.body.data.Notes,
      SessionPrice: req.body.data.SessionPrice,
      NumberOfMaxillaryImplants: req.body.data.NumberOfMaxillaryImplants,
      NumberOfMandibularImplants: req.body.data.NumberOfMandibularImplants,

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

// Define the route to get aggregated data by patients
router.get("/patient-visit-sums", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    // Fetch patients with their visits using populate
    const patients = await Patients.find({})
      .populate({
        path: "visit", // Assuming 'visit' is the field name in Patients model
        select: "TotalAmount TheArrivingAmount SessionPrice", // Only select relevant fields
      })
      .exec();

    // Process the fetched patients to calculate sums and filter by TotalAmount > 0
    const processedPatients = patients
      .map((patient) => {
        // Calculate the sums for each patient
        const totalAmount = patient.visit.reduce((sum, visit) => sum + (visit.TotalAmount || 0), 0);
        const arrivingAmount = patient.visit.reduce((sum, visit) => sum + (visit.TheArrivingAmount || 0), 0);
        const sessionPrice = patient.visit.reduce((sum, visit) => sum + (visit.SessionPrice || 0), 0);

        return {
          patientId: patient._id,
          patientName: patient.name,
          TotalAmount: totalAmount,
          TheArrivingAmount: arrivingAmount,
          "TotalAmount-TheArrivingAmount": totalAmount - arrivingAmount,
          SessionPrice: sessionPrice,
        };
      })
      .filter((patient) => patient.TotalAmount > 0); // Only include patients with a non-zero TotalAmount

    // Sort by TotalAmount-TheArrivingAmount in descending order
    const sortedPatients = processedPatients.sort(
      (a, b) => b["TotalAmount-TheArrivingAmount"] - a["TotalAmount-TheArrivingAmount"]
    );

    // Implement pagination
    const paginatedResults = sortedPatients.slice(skip, skip + pageSize);

    // Send the response
    res.json(paginatedResults);
  } catch (error) {
    console.error("Error fetching patient visit sums:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});



module.exports = router;
