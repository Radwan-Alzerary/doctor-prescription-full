const router = require("express").Router();
const SurgicalProcedures = require("../model/surgicalProcedures");
const Patients = require("../model/patients"); // Make sure to adjust the path as needed
const SurgicalProceduresDevice = require("../model/surgicalProceduresDevice");
const SurgicalProceduresNarcosis = require("../model/surgicalProceduresNarcosis");
const SurgicalProceduresType = require("../model/surgicalProceduresType");

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
  try {
    const surgicalProcedures = new SurgicalProcedures();
    await surgicalProcedures.save();
    res.status(200).json({
      message: "surgicalProcedures added to patient successfully",
      surgeryData: surgicalProcedures,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new SurgicalProceduresType
router.post("/surgery/", async (req, res) => {
  try {
    console.log(req.body.data);

    const currentSurgery = await SurgicalProcedures.findById(req.body.id);
    let PatintId = "";
    let narcosisId = "";
    let typeId = "";
    let productDeviceId = "";
    if (req.body.data.patient.id) {
      PatintId = req.body.data.patient.id;
    } else {
      const newPatint = await Patients.create({
        name: req.body.data.patient.name,
        age: req.body.data.patient.age,
        gender: req.body.data.patient.gender,
      });
      PatintId = newPatint._id.toString();
    }
    if (req.body.data.sutrgeryNarcosis.id) {
      narcosisId = req.body.data.sutrgeryNarcosis.id;
    } else {
      const newNarcosis = await SurgicalProceduresNarcosis.create({
        name: req.body.data.sutrgeryNarcosis.name,
      });
      narcosisId = newNarcosis._id.toString();
    }
    if (req.body.data.surgeryType.id) {
      typeId = req.body.data.surgeryType.id;
    } else {
      const newType = await SurgicalProceduresType.create({
        name: req.body.data.surgeryType.name,
      });
      typeId = newType._id.toString();
    }
    if (req.body.data.productDevice.id) {
      productDeviceId = req.body.data.productDevice.id;
    } else {
      const productDevice = await SurgicalProceduresDevice.create({
        name: req.body.data.productDevice.name,
      });
      productDeviceId = productDevice._id.toString();
    }
    currentSurgery.SurgicalProceduresDevice = productDeviceId;
    currentSurgery.SurgicalProceduresNarcosis = narcosisId;
    currentSurgery.SurgicalProceduresType = typeId;
    currentSurgery.Patients = PatintId;
    currentSurgery.NarcosisStartTime = req.body.data.sutrgeryNarcosis.startTime;
    currentSurgery.NarcosisEndTime = req.body.data.sutrgeryNarcosis.endTime;
    currentSurgery.HospitalName = req.body.data.HospitalName;
    currentSurgery.SurgeryName = req.body.data.SurgeryName;
    currentSurgery.SurgeryDate = req.body.data.SurgeryDate;
    currentSurgery.SurgeryAssistantName = req.body.data.SurgeryAssistantName;
    currentSurgery.SurgeryCost = req.body.data.SurgeryCost;
    currentSurgery.active = true;
    currentSurgery.priority = req.body.data.priority;
    currentSurgery.dangerLevel = req.body.data.dangerLevel;
    currentSurgery.SurgeryCost = req.body.data.SurgeryCost;
    currentSurgery.SurgeryResult = req.body.data.SurgeryResult;
    currentSurgery.SurgeryStartTime = req.body.data.startTime;
    currentSurgery.SurgeryEndTime = req.body.data.endTime;
    await currentSurgery.save();
    // const surgicalProcedures = await SurgicalProcedures.create(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a list of all SurgicalProceduresTypes
router.get("/surgery/", async (req, res) => {
  try {
    const surgicalProcedures = await SurgicalProcedures.find({ active: true })
      .populate("Patients")
      .populate("SurgicalProceduresDevice")
      .populate("SurgicalProceduresNarcosis")
      .populate("SurgicalProceduresType");
    res.json(surgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single SurgicalProceduresType by ID
router.get("/surgery/:id", async (req, res) => {
  try {
    const surgicalProcedures = await SurgicalProcedures.findById(req.params.id)
      .populate("Patients")
      .populate("SurgicalProceduresDevice")
      .populate("SurgicalProceduresNarcosis")
      .populate("SurgicalProceduresType");
    if (!surgicalProcedures) {
      return res.status(404).json({ error: "SurgicalProcedures not found" });
    }
    res.json(surgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a SurgicalProceduresType by ID
router.put("/surgery/:id", async (req, res) => {
  try {
    const surgicalProcedures = await SurgicalProcedures.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!surgicalProcedures) {
      return res.status(404).json({ error: "Type not found" });
    }
    res.json(surgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a SurgicalProceduresType by ID
router.delete("/surgery/:id", async (req, res) => {
  try {
    const surgicalProcedures = await SurgicalProcedures.findByIdAndRemove(
      req.params.id
    );
    if (!surgicalProcedures) {
      return res.status(404).json({ error: "SurgicalProcedures not found" });
    }
    res.json(surgicalProcedures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/afterSurgeryImage",
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.body.id);
    const { filename, path } = req.file;
    const { name } = req.body;
    console.log(filename, path, name);
    const url = req.protocol + "://" + req.get("host");
    const imagePath = req.file ? "/img/" + req.file.filename : null;
    console.log(imagePath);
    try {
      const medicalReportsStype = await SurgicalProcedures.findByIdAndUpdate(
        req.body.id,
        { $push: { afterSurgeryImage: imagePath } },
        { new: true }
      );
      if (!medicalReportsStype) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(medicalReportsStype);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/beforeSurgeryImage",
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.body.id);
    const { filename, path } = req.file;
    const { name } = req.body;
    console.log(filename, path, name);
    const url = req.protocol + "://" + req.get("host");
    const imagePath = req.file ? "/img/" + req.file.filename : null;
    console.log(imagePath);
    try {
      const medicalReportsStype = await SurgicalProcedures.findByIdAndUpdate(
        req.body.id,
        { $push: { beforeSurgeryImage: imagePath } },
        { new: true }
      );
      if (!medicalReportsStype) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(medicalReportsStype);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
module.exports = router;
