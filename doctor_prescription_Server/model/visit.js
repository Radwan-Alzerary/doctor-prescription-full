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
    patients: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
  },
  {
    timestamps: true,
  }
);

const visit = mongoose.model("visit", visitSqema);

module.exports = visit;
