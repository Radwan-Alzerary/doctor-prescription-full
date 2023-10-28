const mongoose = require("mongoose");
const MedicineSchema = new mongoose.Schema(
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

const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;
