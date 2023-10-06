const mongoose = require("mongoose");
const SystemSettingSchema = new mongoose.Schema(
  {
    pharmaceuticalLoded:{type:Boolean,default:false},
    expireDate:{type:Date},
    active:{type:Boolean,default:false},

},
  {
    timestamps: true,
  }
);
const systemSetting = mongoose.model("SystemSetting", SystemSettingSchema);

module.exports = systemSetting;
