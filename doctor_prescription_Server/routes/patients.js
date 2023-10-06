const router = require("express").Router();
const Prescription = require("../model/prescription"); // Make sure to adjust the path as needed

const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const ConstantDiseases = require("../model/constantDiseases");
// Add a new patients
router.post("/new", async (req, res) => {
  const patientsDate = {};
  try {
    patientsDate.name = req.body.name;
    patientsDate.phonNumber = req.body.phonNumber;
    patientsDate.adresses = req.body.adresses;
    patientsDate.gender = req.body.gender;
    patientsDate.age = req.body.age;
    patientsDate.length = req.body.length;
    patientsDate.weight = req.body.weight;
    patientsDate.description = req.body.description;

    const diseasesArray = req.body.diseases;
    const resultArray = [];

    for (const diseaseName of diseasesArray) {
      const existingDisease = await ConstantDiseases.findOne({
        name: diseaseName,
      });

      if (existingDisease) {
        resultArray.push(existingDisease._id.toString());
      } else {
        const newDisease = { name: diseaseName };
        const insertResult = new ConstantDiseases(newDisease);
        await insertResult.save();
        resultArray.push(insertResult._id.toString());
      }
    }

    patientsDate.diseases = resultArray;
    console.log(resultArray);
    const patients = new Patients(patientsDate);
    await patients.save();
    res.status(201).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/edit", async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id; // Extract the ID from the URL parameter
    const updatedData = {
      name: req.body.name,
      phonNumber: req.body.phonNumber,
      adresses: req.body.adresses,
      gender: req.body.gender,
      age: req.body.age,
      length: req.body.length,
      weight: req.body.weight,
      description: req.body.description,
      fumbling: req.body.fumbling,
      medicalDiagnosis: req.body.medicalDiagnosis,
      currentMedicalHistory: req.body.currentMedicalHistory,
      medicalHistory: req.body.medicalHistory,
      previousSurgeries: req.body.previousSurgeries,
      familyHistory: req.body.familyHistory,
    };

    if (req.body.diseases) {
      const diseasesArrayId = [];
      const objects = req.body.diseases.split("},{");
      const jsonArrayString = "[" + objects.join("},{") + "]";
      const diseasesArray = JSON.parse(jsonArrayString);
      diseasesArray.forEach((disease) => {
        diseasesArrayId.push(disease.constantDiseasesId);
      });

      updatedData.diseases = diseasesArrayId;
    }
    // Find the patient by ID and update their data
    const updatedPatient = await Patients.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all patients
router.get("/getall", async (req, res) => {
  try {
    const patients = await Patients.find()
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
      })
      .sort({ updatedAt: -1 }); // Sort by 'updatedAt' field in descending order
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all patients
router.get("/getbyname/", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const patients = await Patients.find().populate("prescription");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/medicalinfo/:partientId", async (req, res) => {
  try {
    const patients = await Patients.findById(req.params.partientId)
      .populate({
        path: "prescription",
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .populate("medicalReport")
      .populate("diseases")
      .populate("labory");

    console.log(patients);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getbyname/:searchName", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const patients = await Patients.find({
      name: { $regex: searchName, $options: "i" },
    }).populate("prescription");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one patients by ID
router.get("/getone/:id", async (req, res) => {
  try {
    const patients = await Patients.findById(req.params.id);
    if (!patients) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/printpatientsdata/:Patientsid/prescription/:prescriptionId",
  async (req, res) => {
    try {
      const patients = await Patients.findById(req.params.Patientsid);
      if (!patients) {
        return res.status(404).json({ error: "Category not found" });
      }

      const prescription = await Prescription.findById(
        req.params.prescriptionId
      )
        .populate("pharmaceutical.id")
        .populate("pharmaceutical.inTakeTime");
      console.log({ patients, prescription });
      res.json({ patients, prescription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Edit one category by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const patients = await Patients.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patients) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one category by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const patients = await Patients.findByIdAndDelete(req.params.id);
    if (!patients) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/Patientsid/:Patientsid/prescriptionid/:prescriptionId",
  async (req, res) => {
    const Patientsid = req.params.Patientsid;
    const prescriptionId = req.params.prescriptionId;

    try {
      const updatedPatients = await Patients.findOneAndUpdate(
        { _id: Patientsid },
        { $pull: { prescription: prescriptionId } },
        { new: true }
      );

      // Check if the pharmaceutical item was successfully removed
      if (updatedPatients) {
        res.json(updatedPatients);
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

module.exports = router;
