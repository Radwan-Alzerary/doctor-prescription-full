const mongoose = require("mongoose");
const MedicalExamination = require("./MedicalExamination");

const financialAccountSchema = new mongoose.Schema({
  vault: { type: Number, default: 0 },
  transactions: [
    {
      type:{ type: String, required: true },
      MedicalExamination: { type: mongoose.Schema.Types.ObjectId, ref: "MedicalExamination" },
      totalCost: { type: Number },
      moneyTransfers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "moneyTransfers" },
      ],
      date: { type: Date, default: Date.now },
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model("FinancialAccount", financialAccountSchema);
