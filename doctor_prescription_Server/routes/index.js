const router = require("express").Router();

router.use("/category", require("./category"));
router.use("/pharmaceutical", require("./pharmaceutical"));
router.use("/intaketime", require("./inTakeTime"));
router.use("/patients", require("./patients"));
router.use("/prescription", require("./prescription"));
router.use("/constantdiseases", require("./constantDiseases"));
router.use('/users', require('./users'));
router.use('/messages', require('./messagesRoute'));
router.use('/gpt', require('./gpt'));
router.use('/labory', require('./labory'));
router.use('/dashboard', require('./dashboard'));

router.use("/medicaleeportstyle", require("./medicalReportsStyle"));
router.use("/medicalreports", require("./medicalreports"));
router.use("/medicine", require("./medicine"));
// router.use('/costemers', require('./costemers'));
router.use("/", require("./routes"));
module.exports = router;
