const mongoose = require("mongoose");
const surgicalProceduresNarcosis = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const SurgicalProceduresNarcosis = mongoose.model("SurgicalProceduresNarcosis", surgicalProceduresNarcosis);

module.exports = SurgicalProceduresNarcosis;
