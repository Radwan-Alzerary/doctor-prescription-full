const router = require("express").Router();

const ConstantDiseases = require("../model/constantDiseases");

// Add a new ConstantDiseases
router.post("/new", async (req, res) => {
  try {
    const constantDiseases = new ConstantDiseases(req.body);
    await constantDiseases.save();
    res.status(201).json(constantDiseases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all ConstantDiseases
router.get("/getall", async (req, res) => {
  try {
    const constantDiseases = await ConstantDiseases.find({active:true} );
    res.json(constantDiseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one ConstantDiseases by ID
router.get("/getone/:id", async (req, res) => {
  try {
    const constantDiseases = await ConstantDiseases.findById(req.params.id);
    if (!constantDiseases) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(constantDiseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

// Edit one ConstantDiseases by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const constantDiseases = await ConstantDiseases.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!constantDiseases) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(constantDiseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete one ConstantDiseases by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const constantDiseases = await ConstantDiseases.findById(
      req.params.id
    );
    if (!constantDiseases) {
      return res.status(404).json({ error: "Category not found" });
    }
    constantDiseases.active = false
    await constantDiseases.save()
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
