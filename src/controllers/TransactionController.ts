import Transaction from "../models/Transaction.js";

export async function getTransactions() {
  return Transaction.find({});
}

export async function addTransaction(transaction) {
  await Transaction.create(transaction);
}

export async function deleteTransaction(transactionId) {
  await Transaction.findByIdAndDelete(transactionId);
}