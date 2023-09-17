const mongoose = require("mongoose");
const ConstantDiseasesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: { type: String },
  },
  {
    timestamps: true,
  }
);
const ConstantDiseases = mongoose.model("ConstantDiseases",  ConstantDiseasesSchema);

module.exports = ConstantDiseases;
