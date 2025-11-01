// models/User.js
import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  plan: { type: String },
  billingCycle: { type: String },
  coupon: { type: String },
  amount: { type: Number },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  razorpay_payment_id: { type: String },
  razorpay_order_id: { type: String },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    subscription: SubscriptionSchema,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
