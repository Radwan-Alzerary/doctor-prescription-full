const mongoose = require("mongoose");
const visitSqema = new mongoose.Schema(
  {
    chiefComplaint: { type: String, default: "" },
    dateOfVisit: { type: String, default: "" },
    investigation: { type: String, default: "" },
    diagnosis: { type: String, default: "" },
    PriorChronicTherapy: { type: String, default: "" },
    CauseOfVisite: { type: String, default: "" },
    management: { type: String, default: "" },
    type: { type: String, default: "" },
    priority: { type: String, default: "normal" },
    patients: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
    chronicTherapy: { type: String, default: "" },
    analysis: { type: String, default: "" },
    riskFactor: { type: String, default: "" },
    pastMedicalHistory: { type: String, default: "" },
    drugHistory: { type: String, default: "" },
    suspendedDx: { type: String, default: "" },
    sequence: { type: String },
    TotalAmount: { type: Number },
    TheArrivingAmount
      : { type: Number },
    SessionPrice: { type: Number },
    DateOfSecondvisit: { type: Date },
    TypeOfExamination: { type: String },
    Notes: { type: String },
    NumberOfMaxillaryImplants: { type: Number },
    NumberOfMandibularImplants: { type: Number },
    NumberOfDaysForFreeReview: { type: Number },

    freeVisitDate: { type: Date },

  },
  {
    timestamps: true,
  }
);

const visit = mongoose.model("visit", visitSqema);

module.exports = visit;
