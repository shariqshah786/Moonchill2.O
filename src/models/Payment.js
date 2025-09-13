// models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userPhone: String,
    orderId: String,
    paymentId: String,
    signature: String,
    amount: Number, // paise
    status: { type: String, default: "pending" },
    planId: String,
    billingCycle: String,
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
