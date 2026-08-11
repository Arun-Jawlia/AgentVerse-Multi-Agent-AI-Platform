import {
  Code2,
  FileText,
  Globe,
  ImageIcon,
  MessageSquare,
  Mic,
  Paperclip,
  Presentation,
  Send,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { startChat } from "../features/agent";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { createConversation, updateConversation } from "../features/chat";
import {
  addConversation,
  setConversationTitle,
  setSelectedConversation,
} from "../redux/converstationSlice";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const { selectedConversation } = useSelector((state) => state.conversation);
  const [selectedAgent, setSelectedAgent] = useState("auto");
  const dispatch = useDispatch();

  const handleStartChat = async () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    try {
      let conversation = selectedConversation;

      if (!conversation?._id) {
        conversation = await createConversation();
        console.log(conversation);
        dispatch(setSelectedConversation(conversation));
        dispatch(addConversation(conversation));
      }

      const conversationId = conversation._id;

      if (conversation.title == "New Chat") {
        await updateConversation({ id: conversationId, title: trimmedValue });
        dispatch(
          setConversationTitle({
            conversationId: conversationId,
            title: trimmedValue,
          }),
        );
      }
      dispatch(
        addMessage({
          role: "user",
          content: trimmedValue,
        }),
      );

      const payload = {
        prompt: trimmedValue,
        conversationId,
        agent: selectedAgent.toLowerCase(),
      };

      setValue("");
      const response = await startChat(payload);
      dispatch(
        addMessage({
          role: "assistant",
          content: response?.answer,
          images: response?.images
        }),
      );
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  const agents = [
    {
      id: "auto",
      icon: Zap,
      label: "Auto",
    },
    {
      id: "chat",
      icon: MessageSquare,
      label: "Chat",
    },
    {
      id: "code",
      icon: Code2,
      label: "Coding",
    },
    {
      id: "pdf",
      icon: FileText,
      label: "PDF",
    },
    {
      id: "ppt",
      icon: Presentation,
      label: "PPT",
    },
    {
      id: "vision",
      icon: ImageIcon,
      label: "Image",
    },
    {
      id: "search",
      icon: Globe,
      label: "Search",
    },
  ];

const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleStartChat()
  }
};

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/8 border border-white/7 rounded-2xl px-4 pt-3.5 pb-3">
        <div className="flex w-[80%] gap-2 pr-2 flex-wrap ">
          {agents.map((agent) => {
            const isActive = selectedAgent === agent.id;
            const Icon = agent.icon;

            return (
              <div
                onClick={() => setSelectedAgent(agent.id)}
                className={` shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer
            ${isActive ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]" : "bg-white/3 text-slate-400 border-white/6 hover:bg-white/7"}            
            `}
              >
                <Icon
                  size={13}
                  className={`${isActive ? "text-white" : "text-slate-500"}`}
                />
                {agent.label}
              </div>
            );
          })}
        </div>
        <textarea
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Anything..."
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50"
          rows={3}
          value={value}
          onKeyDown={handleKeyDown}
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
