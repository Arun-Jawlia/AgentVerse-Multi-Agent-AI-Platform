import { Mic, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { startChat } from "../features/agent";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const handleStartChat = async () => {
    const payload = {
      prompt: value.trim(),
      conversationId: selectedConversation?._id,
    };
    dispatch(
      addMessage({
        role: "user",
        content: value.trim(),
      }),
    );
    setValue("");
    const response = await startChat(payload);
    dispatch(
      addMessage({
        role: "assistant",
        content: response,
      }),
    );
  };

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/8 border border-white/7 rounded-2xl px-4 pt-3.5 pb-3">
        <textarea
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Anything..."
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50"
          rows={3}
          value={value}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <buton
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/60
            transition-all duration-150 bg-transparent cursor-pointer
            "
            >
              <Paperclip size={16} />
            </buton>
            <buton
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/60
            transition-all duration-150 bg-transparent cursor-pointer
            "
            >
              <Mic size={16} />
            </buton>
          </div>
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-lg border border-none cursor-pointer transition-all duration-150 
              ${value.trim() ? "bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white" : "bg-white/5 text-slate-500 cursor-not-allowed"}`}
            disabled={!value}
            onClick={handleStartChat}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
