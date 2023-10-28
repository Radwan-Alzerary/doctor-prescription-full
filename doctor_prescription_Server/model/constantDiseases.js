const mongoose = require("mongoose");
const ConstantDiseasesSchema = new mongoose.Schema(
  {
    ownerId:{
      type:String 
     },
 
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
