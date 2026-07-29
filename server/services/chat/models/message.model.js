import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required: true
    },
    role: {
        type: String,
        enum:['user', 'assistent']
    },
    content: {
        type: String
    }

},{
    timestamps:true
})

const Message = mongoose.model("Messaage", messageSchema)
export default Message