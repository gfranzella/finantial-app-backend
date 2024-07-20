const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Crear una transacción
router.post('/', async (req, res) => {
  try {
    const { userId, userName, type, description, comments, amount, currency, exchangeRate, transactionDate } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!userId || !userName || !type || !description || !amount || !currency || !transactionDate) {
      return res.status(400).json({ error: 'Todos los campos requeridos deben estar presentes' });
    }

    const newTransaction = new Transaction({
      userId,
      userName,
      type,
      description,
      comments,
      amount,
      currency,
      exchangeRate,
      transactionDate
    });
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las transacciones
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar una transacción
router.put('/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar una transacción
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transacción eliminada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
