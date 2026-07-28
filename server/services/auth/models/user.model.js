import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    firebaseUID: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User =  model("User", UserSchema);
export { User };
