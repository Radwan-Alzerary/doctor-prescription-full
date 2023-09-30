const mongoose = require("mongoose");
const PatientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    length: {
      type: Number,
    },
    phonNumber: {
      type: String,
    },
    adresses: {
      type: String,
    },
    visitDate: [{
      type: Date,
    }],
    fumbling: { type: String },
    medicalDiagnosis : {type:String},
    currentMedicalHistory: {type:String},
    medicalHistory: {type:String},
    previousSurgeries: {type:String},
    familyHistory: {type:String},
    visitCount: { type: Number, default: 0 },
    diseases: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ConstantDiseases" },
    ],
    description: { type: String },

    prescription: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
    ],
    medicalReport: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MedicalReportS" },
    ],
    labory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "labory" },
    ],

    Medicine: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }],

    MedicalAnalysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalAnalysis",
    },
  },
  {
    timestamps: true,
  }
);
PatientsSchema.pre("save", async function (next) {
  if (this.isModified("prescription") || this.isModified("medicalReport")) {
    // Get the last prescription and medicalReport
    const lastPrescription = this.prescription[this.prescription.length - 1];
    const lastMedicalReport = this.medicalReport[this.medicalReport.length - 1];

    // Check if the last prescription exists and has a date
    if (lastPrescription && lastPrescription.date) {
      const currentDate = new Date();
      const lastPrescriptionDate = new Date(lastPrescription.date);

      // Check if the last prescription date is different from the current date
      if (
        lastPrescriptionDate.getFullYear() !== currentDate.getFullYear() ||
        lastPrescriptionDate.getMonth() !== currentDate.getMonth() ||
        lastPrescriptionDate.getDate() !== currentDate.getDate()
      ) {
        this.visitCount += 1; // Increment visitCount if dates are different
      }
    }

    // Check if the last medicalReport exists and has a date
    if (lastMedicalReport && lastMedicalReport.date) {
      const currentDate = new Date();
      const lastMedicalReportDate = new Date(lastMedicalReport.date);

      // Check if the last medicalReport date is different from the current date
      if (
        lastMedicalReportDate.getFullYear() !== currentDate.getFullYear() ||
        lastMedicalReportDate.getMonth() !== currentDate.getMonth() ||
        lastMedicalReportDate.getDate() !== currentDate.getDate()
      ) {
        this.visitCount += 1; // Increment visitCount if dates are different
      }
    }
  }

  next();
});

const Patients = mongoose.model("Patients", PatientsSchema);

module.exports = Patients;
