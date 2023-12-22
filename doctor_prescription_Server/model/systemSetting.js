const mongoose = require("mongoose");
const SystemSettingSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },

    pharmaceuticalLoded: { type: Boolean, default: false },
    expireDate: { type: Date },
    active: { type: Boolean, default: false },
    mangerDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    lastBackup: { type: Date },
    abortProssesMsg: { type: Boolean, default: false },
    openEditPrescriptionByClick: { type: Boolean, default: false },

    medicalDiagnosisActive: { type: Boolean, default: true },
    currentMedicalHistoryActive: { type: Boolean, default: true },
    medicalHistoryActive: { type: Boolean, default: true },
    previousSurgeriesActive: { type: Boolean, default: true },
    familyHistoryActive: { type: Boolean, default: true },
    fumblingActive: { type: Boolean, default: true },
    InvestigationFindingActive: { type: Boolean, default: true },
    fracturesActive: { type: Boolean, default: true },
    ExaminationFindiningActive: { type: Boolean, default: true },
    pulseRateActive: { type: Boolean, default: true },
    spo2Active: { type: Boolean, default: true },
    temperatureActive: { type: Boolean, default: true },
    bloodPressureActive: { type: Boolean, default: true },
    bloodSugarActive: { type: Boolean, default: true },
    miscarriageStateActive: { type: Boolean, default: true },
    pregnancyActive: { type: Boolean, default: true },

    autoBackUp: { type: Boolean, default: false },
    isForWoman: { type: Boolean, default: false },
    isForSurgery: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const systemSetting = mongoose.model("SystemSetting", SystemSettingSchema);

module.exports = systemSetting;
