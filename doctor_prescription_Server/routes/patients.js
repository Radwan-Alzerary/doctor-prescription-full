const router = require("express").Router();
const Prescription = require("../model/prescription"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const ConstantDiseases = require("../model/constantDiseases");
const axios = require("axios");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extension);
  },
});

// Create multer instance for uploading image
const upload = multer({ storage: storage });

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
router.get("/checktoken", async (req, res) => {
  let dayNum = 0;
  try {
    await axios
      .post("http://95.179.178.183:4000/checkToken", {
        token: "85021035-48d5-4dbb-993c-5c07b5c71a75/30",
      })
      .then(function (response) {
        if (response.data.result) {
          dayNum = response.data.dayNum;
          const today = new Date();
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + dayNum);
          console.log(futureDate);
        } else {
          res.status(400).json({ result: "token expire", day: dayNum });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(dayNum);

    // Send the response from the other server back to the client
    res.status(200).json({ result: "token correct", day: dayNum });
  } catch (error) {
    // Handle any errors that may occur during the request
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.get("/getbyname/", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const patients = await Patients.find().populate({
      path: "prescription",
      match: { active: true }, // Filter prescriptions with active: true
    });
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
        match: { active: true }, // Filter prescriptions with active: true

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
    }).populate({
      path: "prescription",
      match: { active: true }, // Filter prescriptions with active: true
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/queryselect/", async (req, res) => {
  try {
    console.log(req.body);
    const [minAge, maxAge] = req.body.ageQuery.split("-").map(Number);
    const query = {};
    if (req.body.ageQuery) {
      query.age = { $gte: minAge, $lte: maxAge };
    }
    if (req.body.stateQuery) {
      const diseaseIds = [req.body.stateQuery]; // Replace with actual disease IDs
      query.diseases = { $all: diseaseIds };
    }
    if (req.body.genderQuery) {
      query.gender = req.body.genderQuery;
    }
    if (req.body.dateQuery[0].startDate) {
      const startDate = new Date(req.body.dateQuery[0].startDate);
      const endDate = new Date(req.body.dateQuery[0].endDate);
      query.updatedAt = { $gte: startDate, $lte: endDate };
    }
    const patients = await Patients.find(query).populate({
      path: "prescription",
      match: { active: true }, // Filter prescriptions with active: true
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
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
router.get('/today', async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    
    // Set the current date to the beginning of the day (midnight)
    currentDate.setHours(0, 0, 0, 0);

    // Set the end date to the end of the day (11:59:59 PM)
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    // Define the query to find patients with a visit scheduled for today
    const query = {
      'visitDate.date': {
        $gte: currentDate,
        $lte: endDate,
      },
    };

    // Use the Patients model to find patients with visits today
    const patients = await Patients.find(query);

    res.json(patients);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/upcoming', async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();
    
    // Define the query to find patients with a nextVisit date greater than or equal to the current date
    const query = {
      'nextVisit': {
        $gte: currentDate,
      },
    };

    // Use the Patients model to find patients with upcoming appointments
    const patients = await Patients.find(query);

    res.json(patients);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/galaryimage", upload.single("image"), async (req, res, next) => {
  console.log(req.body.id);
  console.log(req.body);
  console.log(req.body);
  console.log(req.body);
  const { filename, path } = req.file;
  const { name } = req.body;
  console.log(filename, path, name);
  const url = req.protocol + "://" + req.get("host");
  const imagePath = req.file ? "/img/" + req.file.filename : null;
  console.log(imagePath);
  try {
    const medicalReportsStype = await Patients.findByIdAndUpdate(
      req.body.id,
      { $push: { galary: imagePath } },
      { new: true }
    );
    if (!medicalReportsStype) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(medicalReportsStype);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
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
