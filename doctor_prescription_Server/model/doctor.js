const mongoose = require("mongoose");
const InTakeTimeSchema = new mongoose.Schema(
  {
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
