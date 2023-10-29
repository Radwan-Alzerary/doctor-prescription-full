const mongoose = require("mongoose");
const SurgicalProceduresTypeSchema = new mongoose.Schema(
  {
    ownerId:{
        type:String 
       },
   
    name: {
      type: String,
    },
    description: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);
const SurgicalProceduresType = mongoose.model("SurgicalProceduresType", SurgicalProceduresTypeSchema);

module.exports = SurgicalProceduresType;
