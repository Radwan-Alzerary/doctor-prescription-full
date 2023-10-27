const mongoose = require("mongoose");
const SurgicalProceduresTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const SurgicalProceduresType = mongoose.model("SurgicalProceduresType", SurgicalProceduresTypeSchema);

module.exports = SurgicalProceduresType;
