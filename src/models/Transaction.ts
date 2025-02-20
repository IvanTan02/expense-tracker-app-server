import mongoose from "mongoose";
import { EXPENSE_CATEGORY } from "../enums.js";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: Object.values(EXPENSE_CATEGORY), required: true },
  date: { type: Date, required: true }
});

export default mongoose.model('Transaction', transactionSchema);