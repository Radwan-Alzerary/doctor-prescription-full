const mongoose = require("mongoose");
const ConstantDiseasesSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },

    name: {
      type: String,
      required: true,
    },
    value: { type: String },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);
const ConstantDiseases = mongoose.model(
  "ConstantDiseases",
  ConstantDiseasesSchema
);

module.exports = ConstantDiseases;
