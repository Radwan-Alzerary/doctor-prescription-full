const router = require("express").Router();

const AutoComplete = require("../model/autoComplete"); // Make sure to adjust the path as needed

// Add a new category
// Get all categories
router.get("/getall", async (req, res) => {
  try {
    const autoComplete = await AutoComplete.findOne({});
    res.json(autoComplete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit one category by ID
router.post("/edit/", async (req, res) => {
  try {
    const autoComplete = await AutoComplete.findOne({});
    autoComplete[req.body.type] = req.body.data;
    await autoComplete.save();
    res.json(autoComplete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
