const mongoose = require("mongoose");
const LaborySchema = new mongoose.Schema(
  {
    ownerId:{
      type:String 
     },
 
    report: { type: String },
    patients: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
  },
  {
    timestamps: true,
  }
);

const labory = mongoose.model("labory", LaborySchema);

module.exports = labory;
