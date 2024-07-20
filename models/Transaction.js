const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "ingreso" o "egreso"
  description: { type: String, required: true },
  comments: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true }, // "USD", "EUR", "VES"
  exchangeRate: { type: Number }, // Si aplica
  date: { type: Date, default: Date.now }, // Fecha de registro
  transactionDate: { type: Date, required: true }, // Fecha de la transacción
  userId: { type: String, required: true },
  userName: { type: String, required: true }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
