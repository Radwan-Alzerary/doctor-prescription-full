const router = require("express").Router();
const MedicalReportsStype = require("../model/medicalReportsStype"); // Make sure to adjust the path as needed
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const DIR = "../public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/backgroundImage", upload.single("profileImg"),async (req, res, next) => {
  console.log(req.file)
  const url = req.protocol + "://" + req.get("host");
    try {
      const medicalReportsStype = await MedicalReportsStype.findByIdAndUpdate(
        req.body.id,
        {backgroundImg:url + "/public/" + req.file.filename}
      );
      if (!medicalReportsStype) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(medicalReportsStype);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

});

router.get("/getmedicalreportstype", async (req, res) => {
  try {
    const medicalReportsStype = await MedicalReportsStype.find({
      name: "prescriptionReports",
    });
    res.json(medicalReportsStype);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    const medicalReportsStype = await MedicalReportsStype.findByIdAndUpdate(
      req.body.id,
      req.body.data
    );
    if (!medicalReportsStype) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(medicalReportsStype);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/newmiddleline", async (req, res) => {
  try {
    let update = "";
    if (req.body.type == "middle") {
      update = { $push: { HeaderMidleText: {} } };
    } else if (req.body.type == "right") {
      update = { $push: { HeaderRightText: {} } };
    } else if (req.body.type == "left") {
      update = { $push: { HeaderLeftText: {} } };
    }
    console.log(req.body);
    const updatedDocument = await MedicalReportsStype.findByIdAndUpdate(
      req.body.id,
      update,
      { new: true } // This option returns the updated document
    );
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/removeline", async (req, res) => {
  try {
    // Use the `updateOne` method to update the document
    console.log(req.body);
    if (req.body.type == "middle") {
      const updatedDocument = await MedicalReportsStype.updateOne(
        { _id: req.body.id },
        { $pull: { HeaderMidleText: { _id: req.body.hederlineid } } }
      );
    } else if (req.body.type == "right") {
      const updatedDocument = await MedicalReportsStype.updateOne(
        { _id: req.body.id },
        { $pull: { HeaderRightText: { _id: req.body.hederlineid } } }
      );
    } else if (req.body.type == "left") {
      const updatedDocument = await MedicalReportsStype.updateOne(
        { _id: req.body.id },
        { $pull: { HeaderLeftText: { _id: req.body.hederlineid } } }
      );
    }

    res.json({ message: "Element removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/updatemiddle", async (req, res) => {
  try {
    console.log(req.body);
    // Find the document by its ID
    const doc = await MedicalReportsStype.findById(req.body.id);

    // Check if the document was found
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (req.body.type == "middle") {
      // Check if the element at the specified index exists
      if (req.body.text == "Color") {
        doc.HeaderMidleText[req.body.index].Color = req.body.data;
      } else if (req.body.text == "text") {
        doc.HeaderMidleText[req.body.index].text = req.body.data;
      } else if (req.body.text == "size") {
        doc.HeaderMidleText[req.body.index].size = req.body.data;
      }
    } else if (req.body.type == "right") {
      if (req.body.text == "Color") {
        doc.HeaderRightText[req.body.index].Color = req.body.data;
      } else if (req.body.text == "text") {
        doc.HeaderRightText[req.body.index].text = req.body.data;
      } else if (req.body.text == "size") {
        doc.HeaderRightText[req.body.index].size = req.body.data;
      }
    } else if (req.body.type == "left") {
      if (req.body.text == "Color") {
        doc.HeaderLeftText[req.body.index].Color = req.body.data;
      } else if (req.body.text == "text") {
        doc.HeaderLeftText[req.body.index].text = req.body.data;
      } else if (req.body.text == "size") {
        doc.HeaderLeftText[req.body.index].size = req.body.data;
      }
    }

    // Save the updated document
    await doc.save();

    return res.status(200).json({
      message: "Element updated successfully",
      updatedElement: doc.HeaderMidleText[req.body.index],
    });
  } catch (error) {
    console.error("Error updating element:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
