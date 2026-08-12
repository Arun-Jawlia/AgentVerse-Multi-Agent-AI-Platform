import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
  },
  {
    _id: false,
  },
);

const artifactsSchema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    files: [fileSchema],
  },
  {
    _id: false,
  },
);

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
    },
    content: {
      type: String,
    },
    images: {
      type: [String],
    },
    artifacts: [artifactsSchema],
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
