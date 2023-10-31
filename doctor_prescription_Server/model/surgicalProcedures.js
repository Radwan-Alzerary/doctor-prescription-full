const mongoose = require("mongoose");
const SurgicalProceduresSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },
    SurgicalProceduresDevice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurgicalProceduresDevice",
    },
    SurgicalProceduresNarcosis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurgicalProceduresNarcosis",
    },
    NarcosisStartTime: {
      type: Date,
    },
    NarcosisEndTime: {
      type: Date,
    },

    SurgicalProceduresType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurgicalProceduresType",
    },
    Patients: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
    },
    HospitalName: {
      type: String,
    },
    SurgeryName: {
      type: String,
    },
    SurgeryDate: { type: Date },
    SurgeryAssistantName: { type: String },
    SurgeryResult: { type: String },
    SurgeryCost: { type: String },
    SurgeryStartTime : {type:Date},
    SurgeryEndTime : {type:Date},
    beforeSurgeryImage: [{ type: String }],
    afterSurgeryImage: [{ type: String }],
    active: { type: Boolean, default: true },
    comment: { type: String },
    priority: { type: String },
    diagnosis: { type: String },
    procedure: { type: String },
    dangerLevel: { type: String },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const SurgicalProcedures = mongoose.model(
  "SurgicalProcedures",
  SurgicalProceduresSchema
);

module.exports = SurgicalProcedures;
