const mongoose = require("mongoose");
const SurgicalProceduresDeviceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
    },

    name: {
      type: String,
    },
    description: {
      type: String,
    },

    manufacureName: {
      type: String,
    },
    serialNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const SurgicalProceduresDevice = mongoose.model(
  "SurgicalProceduresDevice",
  SurgicalProceduresDeviceSchema
);

module.exports = SurgicalProceduresDevice;
