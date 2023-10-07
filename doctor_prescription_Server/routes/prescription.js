const router = require("express").Router();

const Prescription = require("../model/prescription"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const { use } = require("passport");
const Pharmaceutical = require("../model/pharmaceutical"); // Make sure to adjust the path as needed

// Add a new category

router.post("/postpharmaceutical", async (req, res) => {
  try {
    const billData = {};
    if (req.body.inTakeTime == "other") {
      billData.anotherIntaketime = req.body.inTakeTimeOther;
    } else {
      billData.inTakeTime = req.body.inTakeTime;
    }
    billData.dose = req.body.dose;
    billData.doseNum = req.body.doseNum;
    billData.description = req.body.description;

    if (req.body.billId) {
      billData.id = req.body.billId;
    } else {
      const newPharmaceutical = new Pharmaceutical({
        name: req.body.billName,
        dose: billData.dose,
        intaketime: billData.inTakeTime,
        anotherIntaketime: billData.anotherIntaketime,
        doseCount: billData.doseNum,
        description: billData.description,
      });
      await newPharmaceutical.save();
      billData.id = newPharmaceutical._id.toString();
    }

    const PrescriptionId = req.body.PrescriptionId;

    const prescription = await Prescription.findById(PrescriptionId);
    prescription.pharmaceutical.push(billData);

    const updatedPharmaceutical = await Pharmaceutical.findOneAndUpdate(
      { _id: billData.id },
      {
        dose: billData.dose,
        intaketime: billData.inTakeTime,
        anotherIntaketime: billData.anotherIntaketime,
        doseCount: billData.doseNum,
        description: billData.description,
      },
      { new: true } // Set to true to return the updated document
    );
    // console.log("updatedPharmaceutical : ");

    // console.log(billData);
    await prescription.save();
    // console.log(prescription);
    res.status(201).json("prescription");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete(
  "/removebill/:prescriptionId/pharmaceutical/:pharmaceuticalId",
  async (req, res) => {
    const prescriptionId = req.params.prescriptionId;
    const pharmaceuticalId = req.params.pharmaceuticalId;

    try {
      const updatedPrescription = await Prescription.findOneAndUpdate(
        { _id: prescriptionId },
        { $pull: { pharmaceutical: { _id: pharmaceuticalId } } },
        { new: true }
      );

      // Check if the pharmaceutical item was successfully removed
      if (updatedPrescription) {
        res.json(updatedPrescription);
      } else {
        res
          .status(404)
          .json({ message: "Pharmaceutical not found in this prescription." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/ubdateData", async (req, res) => {
  try {
    console.log(req.body);
    const prescription = await Prescription.findById(req.body.data.id);

    if (!prescription) {
      // Handle the case where the prescription is not found
      return res.status(404).json({ message: "Prescription not found" });
    }
    if (prescription.MedicalDiagnosis) {
      prescription.MedicalDiagnosis = req.body.data.diagnosis;
    }
    prescription.active = true;
    await prescription.save();

    const patient = await Patients.findById(req.body.data.patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD string

    // Find the visitDate entry for today's date, if it exists
    const todayVisitDate = patient.visitDate.find(
      (visit) =>
        visit.date && visit.date.toISOString().split("T")[0] === currentDateStr
    );

    if (todayVisitDate) {
      if (todayVisitDate.prescriptionCount) {
        todayVisitDate.prescriptionCount += 1;
      } else {
        todayVisitDate.prescriptionCount = 1;
      }
    } else {
      // Today's date is not in visitDate, so push it with initial counts
      patient.visitDate.push({
        date: currentDate,
        prescriptionCount: 1,
      });
    }

    // Save the updated patient data
    await patient.save();

    res.json({ message: "Prescription updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/new", async (req, res) => {
  try {
    // console.log(req.body);
    const patientId = req.body.PartientsId; // Assuming you have prescription data in req.body

    // Create a new prescription
    const newPrescription = new Prescription();

    // Save the new prescription
    await newPrescription.save();

    // Find the patient by ID
    const patient = await Patients.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Push the new prescription's ID into the patient's prescription field
    // console.log(newPrescription._id.toString());
    patient.prescription.push(newPrescription._id.toString());

    // Save the updated patient
    await patient.save();

    res.status(200).json({
      prescriptionId: newPrescription._id.toString(),
      message: "Prescription added to patient successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all categories
router.get("/getbills/:prescriptionId", async (req, res) => {
  const prescriptionId = req.params.prescriptionId;
  try {
    const prescription = await Prescription.findById(prescriptionId).populate(
      "pharmaceutical.id"
    );
    // console.log(prescription);
    res.json(prescription.pharmaceutical);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const prescription = await Prescription.find({ active: true });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one Pharmaceutical by ID
router.get("/getone/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ error: "Pharmaceutical not found" });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit one Pharmaceutical by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!prescription) {
      return res.status(404).json({ error: "Pharmaceutical not found" });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one Pharmaceutical by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res.status(404).json({ error: "prescription not found" });
    }
    res.json({ message: "prescription deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
