const mongoose = require("mongoose");
const SurgicalProceduresSchema = new mongoose.Schema(
  {
    ownerId:{
        type:String 
       },
   
    name: {
      type: String,
      required: true,
    },
    SurgicalProceduresDevice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurgicalProceduresDevice",
    },
    SurgicalProceduresNarcosis: {
      name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurgicalProceduresNarcosis",
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
    },
    SurgicalProceduresType: {
      name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurgicalProceduresType",
      },
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
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
    SurgeryAssistantName: [{ type: String }],
    SurgeryResult: { type: String },
    SurgeryCost: { type: Number },
    beforeSurgeryImage: [{ type: String }],
    afterSurgeryImage: [{ type: String }],
    active: { type: Boolean, default: true },
    comment: { type: String },
    priority: { type: String },
    diagnosis: { type: String },
    procedure: { type: String },
    dangerLevel: { type: String },
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
