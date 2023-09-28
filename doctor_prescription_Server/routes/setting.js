const SystemSetting = require("../model/systemSetting"); // Make sure to adjust the path as needed

const router = require("express").Router();
router.get("/getdata", async (req, res) => {
  try {
    const pharmaceuticalCount = await SystemSetting.findOne({});
    res.json(pharmaceuticalCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
