import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model('Transaction', transactionSchema);