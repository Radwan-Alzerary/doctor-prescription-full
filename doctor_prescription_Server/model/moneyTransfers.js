const mongoose = require("mongoose");

const moneyTransfersSchema = new mongoose.Schema({
  vault: { type: Number, default: 0 },
  transferType: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

module.exports = mongoose.model("MoneyTransfers", moneyTransfersSchema);