import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    currency: {
      type: String,
      default: "INR",
    },
    credits: {
      type: Number,
    },
    plan: {
      type: String,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  {
    timestamps: True,
  },
);

const Payment = new mongoose.model("Payment", PaymentSchema);
export default Payment;
