const mongoose = require("mongoose");
const MedicalReportSchema = new mongoose.Schema(
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

const MedicalReportS = mongoose.model("MedicalReportS", MedicalReportSchema);

module.exports = MedicalReportS;
