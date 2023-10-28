const mongoose = require("mongoose");
const InTakeTimeSchema = new mongoose.Schema(
  {
    ownerId:{
      type:String 
     },
 
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const InTakeTime = mongoose.model("InTakeTime", InTakeTimeSchema);

module.exports = InTakeTime;
