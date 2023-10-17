const SystemSetting = require("../model/systemSetting"); // Make sure to adjust the path as needed
const mongoose = require("mongoose");
const fs = require('fs');

const router = require("express").Router();
router.get("/getdata", async (req, res) => {
  try {
    const pharmaceuticalCount = await SystemSetting.findOne({});
    res.json(pharmaceuticalCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/exportdata", async (req, res) => {
  try {
    const modelNames = mongoose.modelNames();

    // Ensure the data directory exists
    const dataDirectory = '../data';
    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory);
    }

    const exportPromises = modelNames.map(async (modelName) => {
      const Model = mongoose.model(modelName);
      const data = await Model.find({});
      const dataPath = `../data/${modelName}.json`;

      // Write the data to the file
      fs.writeFileSync(dataPath, JSON.stringify(data));

      console.log(`Exported ${modelName} to ${dataPath}`);
    });

    await Promise.all(exportPromises);
    await SystemSetting.findOneAndUpdate(
      {},
      { lastBackup: Date.now() }
    );

    res.status(200).json({ message: "All models exported successfully" });
  } catch (error) {
    console.error("Error exporting models", error);
    res.status(500).json({ error: "Error exporting models", details: error });
  }
});

router.get("/importdata", async (req, res) => {
  try {
    const modelNames = mongoose.modelNames();

    for (const modelName of modelNames) {
      const dataPath = `../data/${modelName}.json`;

      // Read the JSON data from the file
      const rawData = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(rawData);

      const Model = mongoose.model(modelName);

      // Clear existing data in the model (optional, depending on your needs)
      await Model.deleteMany({});

      // Insert the data into the model
      await Model.insertMany(data);

      console.log(`Imported data for ${modelName}`);
    }

    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    console.error("Error importing data", error);
    res.status(500).json({ error: "Error importing data", details: error });
  }
});

module.exports = router;
