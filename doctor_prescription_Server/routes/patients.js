const router = require("express").Router();
const Prescription = require("../model/prescription"); // Make sure to adjust the path as needed
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const ConstantDiseases = require("../model/constantDiseases");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const Visit = require("../model/visit"); // Make sure to adjust the path as needed
const Medicalreports = require("../model/medicalReport"); // Make sure to adjust the path as needed
const systemSetting = require("../model/systemSetting");
const Pharmaceutical = require("../model/pharmaceutical");
const { startScanning } = require("../services/scanningService");
const path = require('path');

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
    patientsDate.Sequence = req.body.Sequence;
    patientsDate.gender = req.body.gender;
    patientsDate.age = req.body.age;
    patientsDate.monthAge = req.body.monthAge;
    patientsDate.jop = req.body.jop;
    patientsDate.dayAge = req.body.dayAge;
    patientsDate.length = req.body.length;
    patientsDate.weight = req.body.weight;
    patientsDate.numberOfChildren = req.body.numberOfChildren;
    patientsDate.childrenData = req.body.childrenData;
    patientsDate.bloodType = req.body.bloodType;
    patientsDate.description = req.body.description;
    patientsDate.lastEditDate = Date.now();
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
    const patients = new Patients(patientsDate);
    await patients.save();
    res.status(201).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/edit", async (req, res) => {
  try {
    const id = req.body.id; // Extract the ID from the URL parameter
    const ubdateData = req.body;
    if (req.body.diseases) {
      const diseasesArray = req.body.diseases;
      const resultArray = [];
      for (const diseaseName of diseasesArray) {
        let name = "";
        if (diseaseName.name) {
          name = diseaseName.name;
          console.log(diseaseName.name);
          console.log("in database");
        } else {
          name = diseaseName;
          console.log("not in database");
        }
        console.log(name);
        const existingDisease = await ConstantDiseases.findOne({
          name: name,
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
      ubdateData.diseases = resultArray;
    }
    ubdateData.lastEditDate = Date.now();

    const updatedPatient = await Patients.findByIdAndUpdate(id, ubdateData, {
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

router.post("/scan", async (req, res) => {
  try {
    const scannedFilePath = await startScanning();
    let newPath = scannedFilePath.replace("public", "");
    const medicalReportsStype = await Patients.findByIdAndUpdate(
      req.body.id,
      { $push: { galary: newPath } },
      { new: true }
    );
    if (!medicalReportsStype) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(medicalReportsStype);
  } catch (error) {
    res.status(500).send("Error starting scanning process: " + error.message);
  }
});

router.get("/getall", async (req, res) => {
  try {
    const patients = await Patients.find({ name: { $ne: "" } })
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .sort({
        booked: -1, // Sort by 'booked' field in descending order
        lastEditDate: -1,
        updatedAt: -1,
      }); // Sort by 'updatedAt' field in descending order
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/getbooked", async (req, res) => {
  try {
    const patients = await Patients.find({ booked: true }).sort({
      booked: -1, // Sort by 'booked' field in descending order
      lastEditDate: -1,
      updatedAt: -1,
    }); // Sort by 'updatedAt' field in descending order
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getcount", async (req, res) => {
  try {
    const count = await Patients.countDocuments({ name: { $ne: "" } });
    res.json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/reset-booked", async (req, res) => {
  try {
    // Update all patients and set booked to false
    const result = await Patients.updateMany({}, { $set: { booked: false } });

    res.json({ message: `Updated ${result.nModified} patients.`, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getall/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1; // Get the requested page number, default to 1 if not provided
    const perPage = 20; // Number of documents to display per page
    const skip = (page - 1) * perPage; // Calculate the number of documents to skip
    const setting = await systemSetting.findOne();
    const sortField = req.query.sort || ""; // Get the sort field from query, default to empty string if not provided
    const sortOrder = req.query.order === "asc" ? 1 : -1; // Get the sort order from query, default to descending

    let sort = { booked: -1 }; // Always include booked: -1

    if (sortField) {
      // Construct the sort object dynamically based on query parameters
      sort[sortField] = sortOrder;

      // Additional sort criteria
      if (sortField !== "name") sort["name"] = -1;
      if (sortField !== "booked") sort["booked"] = -1;
      if (sortField !== "gender") sort["gender"] = -1;
      if (sortField !== "age") sort["age"] = -1;
      if (sortField !== "Sequence") sort["Sequence"] = -1;
      if (sortField !== "adresses") sort["adresses"] = -1;
      if (sortField !== "weight") sort["weight"] = -1;
      if (sortField !== "length") sort["length"] = -1;
      if (sortField !== "visitCount") sort["visitCount"] = -1;
      if (sortField !== "lastEditDate") sort["lastEditDate"] = -1;
      if (sortField !== "updatedAt") sort["updatedAt"] = -1;
    } else {
      // Default sort criteria
      if (setting.patientsTable.defultSort === "latestUpdate") {
        sort = {
          booked: -1, // Sort by 'booked' field in descending order
          lastEditDate: -1, // Sort by 'lastEditDate' field in descending order
          updatedAt: -1, // Sort by 'updatedAt' field in descending order
        };
      } else {
        if (setting.patientsTable.defultSort === "nameAsc") sort["name"] = 1;
        if (setting.patientsTable.defultSort === "nameDesc") sort["name"] = -1;
        if (setting.patientsTable.defultSort === "autoAsc")
          sort["createdAt"] = 1;
        if (setting.patientsTable.defultSort === "autoDesc")
          sort["createdAt"] = -1;
        if (setting.patientsTable.defultSort === "manualAsc")
          sort["Sequence"] = 1;
        if (setting.patientsTable.defultSort === "manualDesc")
          sort["Sequence"] = -1;
        if (setting.patientsTable.defultSort === "ageAsc") sort["age"] = 1;
        if (setting.patientsTable.defultSort === "ageDesc") sort["age"] = -1;
      }
    }
    let dateFilter = {};

    if (setting.patientsTable.DateViewQuery !== "everytime") {
      const now = new Date();
      let startDate;
      let endDate = now;

      if (setting.patientsTable.DateViewQuery === "day") {
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(now.setHours(23, 59, 59, 999));
      } else if (setting.patientsTable.DateViewQuery === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );
      } else if (setting.patientsTable.DateViewQuery === "year") {
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      }

      if (startDate) {
        dateFilter = {
          $or: [
            { lastEditDate: { $gte: startDate, $lte: endDate } },
            { booked: true },
          ],
        };
      }
    }
    const patients = await Patients.find({ name: { $ne: "" }, ...dateFilter })
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .sort(sort) // Apply sorting
      .skip(skip)
      .limit(perPage);

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
        } else {
          res.status(400).json({ result: "token expire", day: dayNum });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

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
    const patients = await Patients.find()
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .sort({ updatedAt: -1 }); // Sort by 'updatedAt' field in descending order

    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/getbymedical/", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const patients = await Patients.find()
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .sort({ updatedAt: -1 }); // Sort by 'updatedAt' field in descending order
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/getbymedical/:searchName", async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const patients = await Patients.find({
      $or: [
        { fumbling: { $regex: searchName, $options: "i" } },
        { medicalDiagnosis: { $regex: searchName, $options: "i" } },
        { currentMedicalHistory: { $regex: searchName, $options: "i" } },
        { medicalHistory: { $regex: searchName, $options: "i" } },
        { previousSurgeries: { $regex: searchName, $options: "i" } },
        { familyHistory: { $regex: searchName, $options: "i" } },
        { fractures: { $regex: searchName, $options: "i" } },
        { pulseRate: { $regex: searchName, $options: "i" } },
        { spo2: { $regex: searchName, $options: "i" } },
        { temperature: { $regex: searchName, $options: "i" } },
        { bloodPressure: { $regex: searchName, $options: "i" } },
        { bloodSugar: { $regex: searchName, $options: "i" } },
        { ExaminationFindining: { $regex: searchName, $options: "i" } },
        { InvestigationFinding: { $regex: searchName, $options: "i" } },
      ],
    })
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .sort({ updatedAt: -1 }) // Sort by 'updatedAt' field in descending order
      .limit(10);

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
      .populate("labory")
      .populate("visit");
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
    })
      .populate({
        path: "prescription",
        match: { active: true }, // Filter prescriptions with active: true
        populate: {
          path: "pharmaceutical.id",
        },
      })
      .sort({ updatedAt: -1 }) // Sort by 'updatedAt' field in descending order
      .limit(10);

    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/queryselect/", async (req, res) => {
  try {
    const [minAge, maxAge] = req.body.ageQuery.split("-").map(Number);
    const query = {};
    if (req.body.ageQuery) {
      if (req.body.ageQuery == "all") {
      } else {
        query.age = { $gte: minAge, $lte: maxAge };
      }
    }
    if (req.body.stateQuery) {
      if (req.body.stateQuery == "all") {
        // query.diseases = "";
      } else {
        const diseaseIds = [req.body.stateQuery]; // Replace with actual disease IDs
        query.diseases = { $all: diseaseIds };
      }
    }
    if (req.body.genderQuery) {
      if (req.body.genderQuery == "all") {
        // query.gender = "";
      } else {
        query.gender = req.body.genderQuery;
      }
    }
    if (req.body.dateQuery[0].startDate) {
      const startDate = new Date(req.body.dateQuery[0].startDate);
      const endDate = new Date(req.body.dateQuery[0].endDate);
      query.updatedAt = { $gte: startDate, $lte: endDate };
    }
    const patients = await Patients.find(query)
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
router.get("/checkuser/:name", async (req, res) => {
  try {
    const regex = new RegExp(`^\\s*${req.params.name}`, "i"); // Case-insensitive regex

    const patients = await Patients.findOne({ name: { $regex: regex } });
    if (!patients) {
      return res.json({ result: false });
    } else {
      console.log(patients.name.replace(/\s/g, ""));
      console.log(req.params.name.replace(/\s/g, ""));
      if (
        patients.name.replace(/\s/g, "") === req.params.name.replace(/\s/g, "")
      ) {
        console.log("xx");
        res.json({ result: true });
      } else {
        res.json({ result: false });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/checkuser/", async (req, res) => {
  try {
    res.json({ result: false });
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
      res.json({ patients, prescription });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
router.get("/today", async (req, res) => {
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
      "visitDate.date": {
        $gte: currentDate,
        $lte: endDate,
      },
    };

    // Use the Patients model to find patients with visits today
    const patients = await Patients.find(query);

    res.json(patients);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/upcoming", async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Define the query to find patients with a nextVisit date greater than or equal to the current date
    const query = {
      nextVisit: {
        $gte: currentDate,
      },
    };

    // Use the Patients model to find patients with upcoming appointments
    const patients = await Patients.find(query);

    res.json(patients);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/galaryimage", upload.single("image"), async (req, res, next) => {
  const imagePath = req.file ? "/img/" + req.file.filename : null;
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
router.post("/images/delete", async (req, res, next) => {
  const patientId = req.body.id;
  const imageUrl = req.body.imageUrl;
  try {
    const updatedPrescription = await Patients.findOneAndUpdate(
      { _id: patientId },
      { $pull: { galary: imageUrl } },
      { new: true }
    );

    //   // Check if the pharmaceutical item was successfully removed
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
router.get("/import", async (req, res) => {
  try {
    // Replace 'your-json-file.json' with the path to your JSON file
    const jsonFilePath = "data.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const pharmaceuticalsArray = JSON.parse(jsonData);

    for (const item of pharmaceuticalsArray) {
      // Create a new Pharmaceutical document with the necessary fields
      const newPatients = new Patients({
        name: item.name, // Assuming 'text' field contains the name
        gender: "ذكر",
        Sequence: item.serialn,
        adresses: item.adress ?? "",
        phonNumber: item.phoneNumber ?? "",
      });
      try {
        // Save the pharmaceutical document to the database
        await newPatients.save();
        console.log(`Added: ${item.name}`);
      } catch (error) {
        console.error(`Error adding ${item.name}: ${error.message}`);
      }
    }
    res.status(200).json({ message: "Import completed." });
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/importasem", async (req, res) => {
  try {
    // Replace 'your-json-file.json' with the path to your JSON file
    const jsonFilePath = "dbo.tblPatient.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const pharmaceuticalsArray = JSON.parse(jsonData);

    for (const item of pharmaceuticalsArray) {
      var dob = new Date(item.PDOB);
      var currentDate = new Date();

      // Calculate the age
      var age = currentDate.getFullYear() - dob.getFullYear();
      console.log(age);
      // Create a new Pharmaceutical document with the necessary fields
      const newPatients = new Patients({
        name: item.PName, // Assuming 'text' field contains the name
        gender: item.gender == "Male" ? "ذكر" : "انثى",
        Sequence: item.PID,
        adresses: item.PAddress ?? "",
        phonNumber: item.PPhone ?? "",
        medicalDiagnosis: item.PSik ?? "",
        currentMedicalHistory: item.PSir ?? "",
        medicalHistory: item.PSig ?? "",
        ExaminationFindining: item.PALer ?? "",
      });
      try {
        // Save the pharmaceutical document to the database
        await newPatients.save();

        const visit = new Visit({
          chiefComplaint: item.DVReason,
          dateOfVisit: item.DIAGDATE,
          investigation: item.DVTests,
          diagnosis: item.DVDiagnos,
        });
        await visit.save();
        // Find the patient by ID
        const patient = await Patients.findById(newPatients._id.toString());
        if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
        }

        // Push the new prescription's ID into the patient's prescription field
        console.log(visit._id.toString());
        patient.visit.push(visit._id.toString());
        const currentDate = new Date();
        const currentDateStr = currentDate.toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD string

        // Find the visitDate entry for today's date, if it exists
        const todayVisitDate = patient.visitDate.find(
          (visit) =>
            visit.date &&
            visit.date.toISOString().split("T")[0] === currentDateStr
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

        const reportData = `<p>${item.report}</p>`;
        const medicalreports = new Medicalreports({ report: reportData ?? "" });
        await medicalreports.save();

        // Push the new prescription's ID into the patient's prescription field
        console.log(medicalreports._id.toString());
        patient.medicalReport.push(medicalreports._id.toString());
        // Find the visitDate entry for today's date, if it exists

        if (todayVisitDate) {
          if (todayVisitDate.medicalReportsCount) {
            todayVisitDate.medicalReportsCount += 1;
          } else {
            todayVisitDate.medicalReportsCount = 1;
          }
        } else {
          // Today's date is not in visitDate, so push it with initial counts
          patient.visitDate.push({
            date: currentDate,
            medicalReportsCount: 1,
          });
        }

        // Save the updated patient
        await patient.save();

        // console.log(`Added: ${item.name}`);
      } catch (error) {
        console.error(`Error adding ${item.name}: ${error.message}`);
      }
    }
    res.status(200).json({ message: "Import completed." });
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/bookpatents", async (req, res) => {
  try {
    let bookedCount = 0;
    await Patients.countDocuments({ booked: true })
      .then((count) => {
        bookedCount = count;
        console.log(`Number of booked patients: ${count}`);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(req.body);
    const id = req.body.id; // Extract the ID from the URL parameter
    const currentPatient = await Patients.findById(req.body.id);
    if (currentPatient.booked) {
      await Patients.updateMany(
        {
          _id: { $ne: id },
          booked: true,
          bookedPriority: { $gt: currentPatient.bookedPriority },
        },
        { $inc: { bookedPriority: -1 } }
      );
    }

    const updatedPatient = await Patients.findByIdAndUpdate(
      id,
      {
        booked: !currentPatient.booked,
        bookedDate: Date.now(),
        bookedPriority: currentPatient.booked ? 0 : bookedCount + 1,
      },
      {
        new: true,
      }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to add patients from POST data
router.get("/add-patients", async (req, res) => {
  try {
    const jsonFilePath = "remName.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const patients = JSON.parse(jsonData);

    // Map the JSON fields to the Mongoose model fields
    const mappedPatients = patients.map((patient) => {
      return {
        name: patient.name,
        // Assuming gender is not available in JSON, setting a default value
        gender: "انثى",
        // Calculating age based on birthdate if available, else setting to null
        age: patient.birthdate
          ? new Date().getFullYear() - new Date(patient.birthdate).getFullYear()
          : null,
        // Assuming monthAge and dayAge are not available in JSON, setting to null
        Sequence: patient.serial,
        // Other fields not available in JSON are set to their defaults or null
        booked: false,
        bookedDate: null,
        bookedPriority: null,
        length: null,
        phonNumber: null,
        adresses: null,
        galary: [],
        visitDate: [],
        fumbling: null,
        medicalDiagnosis: null,
        currentMedicalHistory: null,
        medicalHistory: null,
        previousSurgeries: null,
        familyHistory: null,
        fractures: null,
        pulseRate: null,
        spo2: null,
        temperature: null,
        bloodPressure: null,
        bloodSugar: null,
        miscarriageState: false,
        MiscarriageNo: null,
        MiscarriageData: [],
        pregnancyState: false,
        pregnancyData: {},
        ExaminationFindining: null,
        InvestigationFinding: null,
        visitCount: 0,
        diseases: [],
        description: null,
        jop: null,
        prescription: [],
        surgery: [],
        medicalReport: [],
        labory: [],
        visit: [],
        nextVisit: null,
        Medicine: [],
        bloodType: null,
        MaritalStatus: null,
        lastEditDate: new Date(patient.adddate),
        numberOfChildren: null,
        childrenData: [],
        MedicalAnalysis: null,
      };
    });

    // Add patients to the database
    await Patients.insertMany(mappedPatients);
    res.status(200).send("Patients added successfully");
  } catch (error) {
    console.error("Error adding patients:", error);
    res.status(500).send("An error occurred while adding patients");
  }
});

router.get("/add-visits", async (req, res) => {
  try {
    const jsonFilePath = "remVisit.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const visits = JSON.parse(jsonData);

    for (const visit of visits) {
      const patrint = await Patients.findOne({ Sequence: visit.patintid });
      // Create a new visit document
      console.log(patrint);
      if (patrint) {
        const newVisit = new Visit({
          chiefComplaint: "",
          dateOfVisit: visit.visitdata,
          investigation: visit.result2,
          diagnosis: visit.result,
          PriorChronicTherapy: "",
          CauseOfVisite: "",
          management: "",
          type: "",
          priority: "normal",
          patients: patrint.id, // Assuming patintid is the patient reference
          chronicTherapy: "",
          analysis: visit.pregment,
          riskFactor: "",
          pastMedicalHistory: "",
          drugHistory: "",
          suspendedDx: "",
          sequence: visit.sequence.toString(),
        });

        // Save the visit document
        await newVisit.save();
        if (visit.peridtime) {
          patrint.pregnancyState = true;
          patrint.pregnancyData.DateOfLastPeriod = visit.peridtime;
          await patrint.save();
        }

        // Find the patient by patintid and update their visits array
        await Patients.findByIdAndUpdate(
          patrint.id,
          { $push: { visit: newVisit._id } },
          { new: true, useFindAndModify: false }
        );
      }
    }

    res.status(200).send("Visits added and patients updated successfully");
  } catch (error) {
    console.error("Error adding visits and updating patients:", error);
    res
      .status(500)
      .send("An error occurred while adding visits and updating patients");
  }
});

router.get("/add-drug", async (req, res) => {
  try {
    const jsonFilePath = "remDrug.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const drugs = JSON.parse(jsonData);

    for (const visit of drugs) {
      const newVisit = new Pharmaceutical({
        name: visit.drugname,
        dose: visit.comment,
        description: visit.drugid,
      });

      // Save the visit document
      await newVisit.save();
    }

    res.status(200).send("Visits added and patients updated successfully");
  } catch (error) {
    console.error("Error adding visits and updating patients:", error);
    res
      .status(500)
      .send("An error occurred while adding visits and updating patients");
  }
});

router.get("/drug-pateint", async (req, res) => {
  try {
    const jsonFilePath = "remPres.json";
    console.log(process.cwd());

    // Read the JSON file
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON data
    const prescription = JSON.parse(jsonData);

    for (const pres of prescription) {
      const visit = await Visit.findOne({ sequence: pres.patintID });
      if (visit) {
        const patient = await Patients.findById(visit.patients);

        const pharm = await Pharmaceutical.findOne({
          description: pres.drugID,
        });
        const newPrs = new Prescription({
          MedicalDiagnosis: pres.comment,
          active: true,
          pharmaceutical: [
            {
              id: pharm.id,
              description: pres.intake,
            },
          ],
        });

        // Save the visit document
        await newPrs.save();
        console.log(newPrs._id);

        await Patients.findByIdAndUpdate(
          patient.id,
          { $push: { prescription: newPrs._id } },
          { new: true, useFindAndModify: false }
        );
      }
    }

    res.status(200).send("Visits added and patients updated successfully");
  } catch (error) {
    console.error("Error adding visits and updating patients:", error);
    res
      .status(500)
      .send("An error occurred while adding visits and updating patients");
  }
});


const mainDirectory = path.join(__dirname, '..', 'public', 'rem-image');

router.get("/import-pateint-image", async (req, res) => {
  try {
    const folders = fs.readdirSync(mainDirectory);
    let results = [];

    for (const folderName of folders) {
      const patientPath = path.join(mainDirectory, folderName);

      // Check if the current path is a directory
      if (fs.lstatSync(patientPath).isDirectory()) {
        console.log(`Processing folder: ${folderName}`);

        // Find the patient in the database using the folder name
        const patient = await Patients.findOne({ name: folderName });

        if (patient) {
          const images = fs.readdirSync(patientPath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
          const imageUrls = images.map(image => `/rem-image/${folderName}/${image}`); // Replace with your image URL path

          // Update patient's gallery with new image URLs
          patient.galary.push(...imageUrls);
          await patient.save();

          console.log(`Updated patient ${folderName} with image URLs: ${imageUrls}`);
          results.push({ patient: folderName, status: 'Updated', images: imageUrls });
        } else {
          console.log(`Patient not found for folder: ${folderName}`);
          results.push({ patient: folderName, status: 'Not Found' });
        }
      }
    }

    res.json({ status: 'Completed', results });

  } catch (err) {
    console.error('Error processing folders:', err);
    res.status(500).json({ error: 'An error occurred while processing folders.' });
  }
});


module.exports = router;
