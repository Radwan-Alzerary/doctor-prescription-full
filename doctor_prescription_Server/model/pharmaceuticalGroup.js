const mongoose = require("mongoose");
const pharmaceuticalGroupSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },
    active:{type:Boolean,default:true},
    name: {
      type: String,
      required: true,
    },
    pharmaceutical: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmaceutical",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const pharmaceuticalGroup = mongoose.model("pharmaceuticalGroup", pharmaceuticalGroupSchema);

module.exports = pharmaceuticalGroup;
