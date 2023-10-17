const mongoose = require("mongoose");
const SystemSettingSchema = new mongoose.Schema(
  {
    pharmaceuticalLoded: { type: Boolean, default: false },
    expireDate: { type: Date },
    active: { type: Boolean, default: false },
    mangerDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    lastBackup: { type: Date },
  },
  {
    timestamps: true,
  }
);
const systemSetting = mongoose.model("SystemSetting", SystemSettingSchema);

module.exports = systemSetting;
