import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from './controllers/TransactionController.js';
import { EXPENSE_CATEGORY } from './enums.js';

dotenv.config();

// DB CONNECTION
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', console.error.bind(console, 'Connection Error:'));
mongoose.connection.once('open', () => console.log('Database connected.'));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) });

// ROUTES
app.get('/', async (_req, res) => { res.send('Expense Tracking App Server') })

app.get('/transactions', async (_req, res) => {
  try {
    const transactions = await getTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err.message);
    res.status(500).send('Error fetching transactions');
    return;
  }
})

app.post('/transactions', async (req, res) => {
  try {
    await addTransaction(req.body);
    res.status(200).json('Transaction added successfully.');
  } catch (err) {
    console.error('Error adding transaction:', err.message);
    res.status(500).send('Error adding transaction');
  }
});

app.post('/transactions/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    if (!transactionId) throw new Error('Invalid or null transactionId');
    await updateTransaction(transactionId, req.body);
    res.status(200).json('Transaction updated successfully.');
  } catch (err) {
    console.error('Error updating transaction:', err.message);
    res.status(500).send('Error updating transaction');
  }
});

app.delete('/transactions/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    if (transactionId) await deleteTransaction(transactionId);
    res.status(200).json('Transaction deleted successfully.');
  } catch (err) {
    console.error('Error adding transaction:', err.message);
    res.status(500).send('Error deleting transaction');
  }
});

app.get('/transactions/categories', async (_req, res) => {
  res.json(Object.values(EXPENSE_CATEGORY));
});

