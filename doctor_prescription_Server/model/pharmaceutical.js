const mongoose = require("mongoose");
const PharmaceuticalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    dose: { type: String },
    doseCount: { type: String },
    intaketime: { type: mongoose.Schema.Types.ObjectId, ref: "InTakeTime" },
    anotherIntaketime: { type: String },
    manufactoy: { type: String },
    description: { type: String },
    active: { type: Boolean, default: true },
    favorite: { type: Boolean, default: false },
    midScapeId:{type:String},
    midScapeval:{type:String},
    midScapetype:{type:String},
    midScapeHasInteractions:{type:String},
  },
  {
    timestamps: true,
  }
);
const Pharmaceutical = mongoose.model("Pharmaceutical", PharmaceuticalSchema);

module.exports = Pharmaceutical;
