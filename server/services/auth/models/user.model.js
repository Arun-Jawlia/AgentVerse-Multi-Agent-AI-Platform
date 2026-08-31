import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    firebaseUID: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    plan: { type: String, default: "free" },
    credits: {
      type: Number,
      default: 100,
    },
    totalCredits: {
      type: Number,
      default: 100,
    },
    planExpiresAt: Date,
  },
  {
    timestamps: true,
  },
);

const User = model("User", UserSchema);
export { User };
