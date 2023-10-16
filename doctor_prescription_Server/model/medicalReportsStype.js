const mongoose = require("mongoose");
const MedicalReportsStyleSchema = new mongoose.Schema(
  {
    name: { type: String },

    xPading: { type: String, default: 0 },
    rightPading: { type: String, default: 0 },
    leftPading: { type: String, default: 0 },
    topPading: { type: String, default: 0 },
    bottomPading: { type: String, default: 0 },

    mainNameHeaderColor: { type: String, default: "#EF4444" },
    mainNameHeader: { type: String, default: "اسم الطبيب" },
    mainNameSize: { type: String, default: 1.5 },
    mainNameActive: { type: Boolean, default: true },

    mainNameHeaderkniaColor: { type: String, default: "#EF4444" },
    mainNameHeaderknia: { type: String, default: "دكتور" },
    mainNameHeaderkniaSize: { type: String, default: 1.5 },
    mainNameHeaderkniaActive: { type: Boolean, default: true },

    backgroundColor: { type: String, default: "#fff" },
    HeaderLeftTextActive: { type: Boolean, default: true },
    HeaderLeftText: [
      {
        text: { type: String },
        size: { type: String, default: 0.875 },
        Color: { type: String, default: "#6DA2F8" },
        textAlign: { type: String, default: "left" },
      },
    ],
    HeaderMidleTextActive: { type: Boolean, default: true },
    HeaderMidleText: [
      {
        text: { type: String },
        size: { type: String, default: 0.875 },
        Color: { type: String, default: "#6DA2F8" },
        textAlign: { type: String, default: "center" },
      },
    ],
    HeaderRightTextActive: { type: Boolean, default: true },
    HeaderRightText: [
      {
        text: { type: String },
        size: { type: String, default: 0.875 },
        Color: { type: String, default: "#6DA2F8" },
        textAlign: { type: String, default: "right" },
      },
    ],

    lineColor: { type: String },
    line: {
      line1Active: { type: Boolean, default: true },
      line1Height: { type: Number },
      line2Active: { type: Boolean, default: true },
      line2Height: { type: Number },
      line3Active: { type: Boolean, default: true },
      line3Height: { type: Number },
      line4Active: { type: Boolean, default: true },
      line4Height: { type: Number },
    },
    linesActive :{type:Boolean,default:true},
    tableHeaderActive: { type: Boolean, default: true },
    tableHeaderColor: {
      type: String,
      default: "#000",
    },
    tableHeaderTextSize: {
      type: String,
      default: "1",
    },
    tableContentColor: {
      type: String,
      default: "#000",
    },
    tableContentTextSize: {
      type: String,
      default: "1",
    },

    col1: { type: String, default: "NO." },
    col1Active: { type: Boolean, default: true },
    col2: { type: String, default: "DRUG NAME" },
    col2Active: { type: Boolean, default: true },
    col3: { type: String, default: "DOSES" },
    col3Active: { type: Boolean, default: true },
    col4: { type: String, default: "NO. Dosess" },
    col4Active: { type: Boolean, default: true },
    col5: { type: String, default: "INTAKE TIME" },
    col5Active: { type: Boolean, default: true },
    col6: { type: String, default: "NOTE" },
    col6Active: { type: Boolean, default: true },
    patientsActive: { type: Boolean },
    patientsTitleColor: {
      type: String,
      default: "#EF4444",
    },

    patientsSubTitleColor: {
      type: String,
      default: "#000",
    },

    nameActive: { type: Boolean, default: true },
    ageActive: { type: Boolean, default: true },
    dateActive: { type: Boolean, default: true },
    backgroundImgActive: { type: Boolean, default: true },
    backgroundImg: { type: String },
    signatureActive: { type: Boolean, default: true },
    signatureColor: { type: String, default: "#000" },
    signatureSize: { type: String, default: 0.875 },
    signature: { type: String },
    signatureX: { type: String, default: 85 },
    signatureY: { type: String, default: 80 },

    dateOfRegistrationActive: { type: Boolean, default: true },
    dateOfRegistration: { type: String },
    numberOfRegistratonActive: { type: Boolean, default: true },
    numberOfRegistraton: { type: String },
    addressActive: { type: Boolean, default: true },
    address: { type: String },
    phoneNumber: { type: String },
    phoneNumberActive: { type: Boolean, default: true },

    footerTextColor: { type: String, default: "#000" },
    footerTextSize: { type: String, default: "#000" },
  },
  {
    timestamps: true,
  }
);
const MedicalReportsStyle = mongoose.model(
  "MedicalReportsStyle",
  MedicalReportsStyleSchema
);

module.exports = MedicalReportsStyle;
