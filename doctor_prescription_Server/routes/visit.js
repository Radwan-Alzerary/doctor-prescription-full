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
      selectedTeeth: req.body.data.selectedTeeth,
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
      selectedTeeth: req.body.data.selectedTeeth,

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

router.get("/patient-visit-sums-totals", async (req, res) => {
  try {
    const dateRange = req.query.dateRange;
    let startDate, endDate;

    // Set up date range filter
    const now = new Date();
    switch (dateRange) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;
      case 'custom':
        startDate = new Date(req.query.startDate);
        endDate = new Date(req.query.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return res.status(400).json({ error: "Invalid date range provided" });
        }
        endDate.setDate(endDate.getDate() + 1); // Include the end date
        break;
      case 'all':
      default:
        startDate = new Date(0); // Start from the earliest possible date
        endDate = new Date();    // Up to the current date
        break;
    }

    // Aggregate the total sums over all visits in the date range
    const totals = await Visit.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $ifNull: ["$TotalAmount", 0] } },
          totalArrivingAmount: { $sum: { $ifNull: ["$TheArrivingAmount", 0] } },
          totalSessionPrice: { $sum: { $ifNull: ["$SessionPrice", 0] } }
        }
      }
    ]);

    const totalAmount = totals[0]?.totalAmount || 0;
    const totalArrivingAmount = totals[0]?.totalArrivingAmount || 0;
    const totalSessionPrice = totals[0]?.totalSessionPrice || 0;
    const totalRemainingAmount = totalAmount - totalArrivingAmount;

    res.json({
      totalAmount,
      totalArrivingAmount,
      totalSessionPrice,
      totalRemainingAmount
    });

  } catch (error) {
    console.error("Error fetching patient visit totals:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});




router.get("/patient-visit-sums", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const dateRange = req.query.dateRange;
    let startDate, endDate;

    // Set up date range filter
    const now = new Date();
    switch (dateRange) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;
      case 'custom':
        startDate = new Date(req.query.startDate);
        endDate = new Date(req.query.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return res.status(400).json({ error: "Invalid date range provided" });
        }
        endDate.setDate(endDate.getDate() + 1); // Include the end date
        break;
        case 'all':
          default:
            startDate = new Date(0); // Start from the earliest date
            endDate = new Date();    // Up to the current date
            break;
      }

    // Fetch patients with their visits using populate and date range filter
    const patients = await Patients.find({})
      .populate({
        path: "visit",
        match: {
          createdAt: { $gte: startDate, $lt: endDate }
        },
        select: "TotalAmount TheArrivingAmount SessionPrice date"
      })
      .exec();

    // Process the fetched patients to calculate sums
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
      .filter((patient) => patient.TotalAmount > 0 || patient.SessionPrice > 0); // Corrected field name

    // Sort by TotalAmount-TheArrivingAmount in descending order
    const sortedPatients = processedPatients.sort(
      (a, b) => b["TotalAmount-TheArrivingAmount"] - a["TotalAmount-TheArrivingAmount"]
    );

    // Implement pagination
    const totalResults = sortedPatients.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const paginatedResults = sortedPatients.slice(skip, skip + pageSize);

    // Send the response
    console.log("Total totalPages:", totalPages);
    console.log("Total totalResults:", totalResults);
    res.set('X-Total-Pages', totalPages.toString());
    res.set('Access-Control-Expose-Headers', 'X-Total-Pages'); // Expose the header

    res.json(paginatedResults);
  } catch (error) {
    console.error("Error fetching patient visit sums:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});




module.exports = router;
