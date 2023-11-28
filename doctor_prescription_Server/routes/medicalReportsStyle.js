const router = require("express").Router();
const MedicalReportsStype = require("../model/medicalReportsStype"); // Make sure to adjust the path as needed
const uuidv4 = require("uuid/v4");
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

router.post(
  "/backgroundImage",
  upload.single("image"),
  async (req, res, next) => {
    console.log(req.body);
    const { filename, path } = req.file;
    const { name } = req.body;
    console.log(filename, path, name);
    const url = req.protocol + "://" + req.get("host");
    const imagePath = req.file ? "/img/" + req.file.filename : null;
    console.log(imagePath);
    try {
      const medicalReportsStype = await MedicalReportsStype.findOneAndUpdate(
        {},
        { backgroundImg: imagePath }
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

router.post("/imagesRandom", upload.single("image"), async (req, res, next) => {
  console.log(req.body);
  const { filename, path } = req.file;
  const { name } = req.body;
  console.log(filename, path, name);
  const url = req.protocol + "://" + req.get("host");
  const imagePath = req.file ? "/img/" + req.file.filename : null;
  console.log(imagePath);
  try {
    const medicalReportsStype = await MedicalReportsStype.findOneAndUpdate(
      {},
      { imagesRandom: imagePath }
    );
    if (!medicalReportsStype) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(medicalReportsStype);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/textRandom", async (req, res, next) => {
  try {
    let update = "";
    update = { $push: { textRandom: {} } };
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

router.post("/updatetextRandom", async (req, res) => {
  try {
    console.log(req.body);
    // Find the document by its ID
    const doc = await MedicalReportsStype.findById(req.body.id);

    // Check if the document was found
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (req.body.text == "title") {
      doc.textRandom[req.body.index].title = req.body.data;
    } else if (req.body.text == "size") {
      doc.textRandom[req.body.index].size = req.body.data;
    } else if (req.body.text == "x") {
      doc.textRandom[req.body.index].x = req.body.data;
    } else if (req.body.text == "y") {
      doc.textRandom[req.body.index].y = req.body.data;
    } else if (req.body.text == "color") {
      doc.textRandom[req.body.index].color = req.body.data;
    }
    await doc.save();

    return res.status(200).json({
      message: "Element updated successfully",
      updatedElement: doc.textRandom[req.body.index],
    });
  } catch (error) {
    console.error("Error updating element:", error);
    return res.status(500).json({ message: "Internal server error" });
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
    } else if (req.body.type == "randomText") {
      const updatedDocument = await MedicalReportsStype.updateOne(
        { _id: req.body.id },
        { $pull: { textRandom: { _id: req.body.hederlineid } } }
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
      } else if (req.body.text == "textWeight") {
        doc.HeaderMidleText[req.body.index].textWeight = req.body.data;
      }else if (req.body.text == "marginB") {
        doc.HeaderMidleText[req.body.index].marginB = req.body.data;
      }
    } else if (req.body.type == "right") {
      if (req.body.text == "Color") {
        doc.HeaderRightText[req.body.index].Color = req.body.data;
      } else if (req.body.text == "text") {
        doc.HeaderRightText[req.body.index].text = req.body.data;
      } else if (req.body.text == "size") {
        doc.HeaderRightText[req.body.index].size = req.body.data;
      } else if (req.body.text == "textWeight") {
        doc.HeaderRightText[req.body.index].textWeight = req.body.data;
      }else if (req.body.text == "marginB") {
        doc.HeaderRightText[req.body.index].marginB = req.body.data;
      }
    } else if (req.body.type == "left") {
      if (req.body.text == "Color") {
        doc.HeaderLeftText[req.body.index].Color = req.body.data;
      } else if (req.body.text == "text") {
        doc.HeaderLeftText[req.body.index].text = req.body.data;
      } else if (req.body.text == "size") {
        doc.HeaderLeftText[req.body.index].size = req.body.data;
      } else if (req.body.text == "textWeight") {
        doc.HeaderLeftText[req.body.index].textWeight = req.body.data;
      }else if (req.body.text == "marginB") {
        doc.HeaderLeftText[req.body.index].marginB = req.body.data;
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
