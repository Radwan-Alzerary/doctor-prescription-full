const mongoose = require("mongoose");
const visitSqema = new mongoose.Schema(
  {
    chiefComplaint: { type: String },
    dateOfVisit: { type: String },
    investigation: { type: String },
    diagnosis: { type: String },
    PriorChronicTherapy: { type: String },
    CauseOfVisite: { type: String },
    management: { type: String },
    type: { type: String },
    patients: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
  },
  {
    timestamps: true,
  }
);

const visit = mongoose.model("visit", visitSqema);

module.exports = visit;
