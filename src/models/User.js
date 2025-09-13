// // models/User.js
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: String,
//     phone: { type: String, unique: true, sparse: true },
//     email: { type: String, unique: true, sparse: true },
//     password: String,
//     subscription: {
//       planId: String,
//       planName: String,
//       billingCycle: String,
//       price: Number, // rupees
//       status: { type: String, default: "inactive" },
//       paymentId: String,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
