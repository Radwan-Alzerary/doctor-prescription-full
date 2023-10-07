const Pharmaceutical = require("../model/pharmaceutical"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const Prescription = require("../model/prescription"); // Make sure to adjust the path as needed

const router = require("express").Router();
router.get("/getcount", async (req, res) => {
  try {
    const pharmaceuticalCount = await Pharmaceutical.count();
    const patientsCount = await Patients.count();
    const PrescriptionCount = await Prescription.countDocuments({ active: true });

    // Calculate the start and end of the current day
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    const visitCounts = await Patients.aggregate([
      {
        $unwind: "$visitDate",
      },
      {
        $group: {
          _id: {
            year: { $year: "$visitDate.date" },
            month: { $month: "$visitDate.date" },
            day: { $dayOfMonth: "$visitDate.date" },
          },
          totalVisits: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
      {
        $group: {
          _id: null,
          dailyCounts: {
            $push: {
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
              count: "$totalVisits",
            },
          },
          totalVisits: { $sum: "$totalVisits" },
        },
      },
      {
        $project: {
          _id: 0,
          dailyCounts: 1,
          totalVisits: 1,
        },
      },
    ]);

    // Calculate the count of visits for today
    const todayCont = visitCounts[0].dailyCounts.find(
      (entry) => entry.date.toDateString() === today.toDateString()
    )?.count || 0;

    console.log(visitCounts[0]);
    res.json({
      dailyVisitCounts: visitCounts[0].dailyCounts,
      totalVisitDateCount: visitCounts[0].totalVisits,
      pharmaceuticalCount: pharmaceuticalCount,
      patientsCount: patientsCount,
      PrescriptionCount: PrescriptionCount,
      todayCont: todayCont, // Add the count of visits for today
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
