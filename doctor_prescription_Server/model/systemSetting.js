const mongoose = require("mongoose");
const SystemSettingSchema = new mongoose.Schema(
  {
    ownerId:{
      type:String 
     },
 
    pharmaceuticalLoded: { type: Boolean, default: false },
    expireDate: { type: Date },
    active: { type: Boolean, default: false },
    mangerDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    lastBackup: { type: Date },
    abortProssesMsg :{type:Boolean,default:false},
    openEditPrescriptionByClick :{type:Boolean,default:false},
    autoBackUp :{type:Boolean,default:false},
    isForWoman : {type:Boolean,default:false},
    isForSurgery : {type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);
const systemSetting = mongoose.model("SystemSetting", SystemSettingSchema);

module.exports = systemSetting;
