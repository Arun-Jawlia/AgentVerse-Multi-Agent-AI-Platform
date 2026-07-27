import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    firebaseUID: {
      type: String,
      unique: true,
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

const User = new model("User", UserSchema);
export { User };
