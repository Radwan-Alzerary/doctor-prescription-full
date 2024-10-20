const mongoose = require('mongoose');

const MedicalExaminationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
  },
  description: {
    type: String,
  },
  SpecialOptions: [{ type: String }],
});

const MedicalExamination = mongoose.model('MedicalExamination', MedicalExaminationSchema);

module.exports = MedicalExamination;
