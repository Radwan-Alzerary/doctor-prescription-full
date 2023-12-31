const mongoose = require("mongoose");
const PrescriptionSchema = new mongoose.Schema(
  {
    ownerId:{
      type:String 
     },
 
    name: {
      type: String,
    },
    ready: { type: Boolean },
    MedicalDiagnosis: { type: String },
    active :{type:Boolean,default:false},
    pharmaceutical: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmaceutical" },
        dose: { type: String },
        doseNum: { type: String },
        inTakeTime: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "InTakeTime", // Reference the correct model here
        },
        anotherIntaketime: { type: String },
        description: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Prescription = mongoose.model("Prescription", PrescriptionSchema);

module.exports = Prescription;
