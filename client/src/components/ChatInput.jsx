import {
  Code2,
  FileText,
  Globe,
  ImageIcon,
  MessageSquare,
  Mic,
  MicOff,
  Paperclip,
  Presentation,
  Send,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { startChat } from "../features/agent";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setArtifacts, setIsLoading } from "../redux/messageSlice";
import { createConversation, updateConversation } from "../features/chat";
import {
  addConversation,
  setConversationTitle,
  setSelectedConversation,
} from "../redux/converstationSlice";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { isLoading } = useSelector((state) => state.message);
  const [selectedAgent, setSelectedAgent] = useState("auto");
  const [selectedFile, setSelectedFile] = useState(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index++
      ) {
        transcript += event.results[index][0].transcript;
      }

      console.log(transcript);
      setValue(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported");
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // useEffect(() => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;

  //   if (!SpeechRecognition) {
  //     return;
  //   }

  //   const recognition = new SpeechRecognition();

  //   recognition.lang = "en-US";
  //   recognition.continuous = true;
  //   recognition.interimResults = true;

  //   recognition.onstart = () => {
  //     setListening(true);
  //   };

  //   recognition.onresult = (event) => {
  //     let finalTranscript = "";
  //     let interimTranscript = "";

  //     for (let i = event.resultIndex; i < event.results.length; i++) {
  //       const result = event.results[i];

  //       if (result.isFinal) {
  //         finalTranscript += result[0].transcript;
  //       } else {
  //         interimTranscript += result[0].transcript;
  //       }
  //     }

  //     // Store only finalized speech permanently
  //     if (finalTranscript) {
  //       transcriptRef.current += finalTranscript;
  //     }

  //     // Update UI with final + current interim speech
  //     setValue(`${transcriptRef.current} ${interimTranscript}`.trim());
  //   };

  //   recognition.onerror = (event) => {
  //     console.error("Speech recognition error:", event.error);

  //     // Ignore normal termination errors
  //     if (event.error === "aborted" || event.error === "no-speech") {
  //       return;
  //     }

  //     setListening(false);
  //   };

  //   recognition.onend = () => {
  //     setListening(false);
  //   };

  //   recognitionRef.current = recognition;

  //   return () => {
  //     recognition.stop();
  //     recognitionRef.current = null;
  //   };
  // }, []);

  // const toggleMic = () => {
  //   const recognition = recognitionRef.current;

  //   if (!recognition) {
  //     alert("Speech recognition is not supported in this browser.");
  //     return;
  //   }

  //   if (listening) {
  //     recognition.stop();
  //     setListening(false);
  //     return;
  //   }

  //   try {
  //     recognition.start();
  //   } catch (error) {
  //     console.error("Failed to start speech recognition:", error);
  //   }
  // };

  const handleStartChat = async () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    dispatch(setIsLoading(true));

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

      const formData = new FormData();
      formData.append("prompt", trimmedValue);
      formData.append("conversationId", conversationId);
      formData.append("agent", selectedAgent.toLowerCase());
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      setValue("");
      const response = await startChat(formData);
      dispatch(setIsLoading(false));
      setSelectedFile(null);
      dispatch(setArtifacts(response?.artifacts || []));
      dispatch(
        addMessage({
          role: "assistant",
          content: response?.answer,
          images: response?.images,
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
      handleStartChat();
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

        {selectedFile && (
          <div className="my-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2">
              {selectedFile.type === "application/pdf" ? (
                <FileText size={16} className="text-red-400" />
              ) : (
                selectedFile.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    className="h-10 w-10 rounded-xl object-cover mt-3"
                  />
                )
              )}
              <div>
                <p className="text-xs text-white">{selectedFile?.name}</p>
                <p className="text-[10px] text-slate-500">
                  {Math.ceil(selectedFile.size)}KB
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  fileRef.current.value(null);
                }}
                className="ml-2 "
              >
                <X size={14} className="text-slate-500 hover:text-white" />
              </button>
            </div>
          </div>
        )}
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
            <input
              type="file"
              accept=".pdf, image/*"
              hidden
              ref={fileRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                }
              }}
            />
            <buton
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/60
            transition-all duration-150 bg-transparent cursor-pointer
            "
              onClick={() => fileRef.current.click()}
            >
              <Paperclip size={16} />
            </buton>
            <buton
              className={`flex items-center justify-center w-8 h-8 rounded-lg border  hover:border-white/60
            transition-all duration-150 cursor-pointer ${listening ? "bg-red-500 text-white" : "text-slate-600 hover:bg-white/5"}
            `}
              onClick={toggleMic}
            >
              {listening ? <Mic size={16} /> : <MicOff size={16} />}
            </buton>
          </div>
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-lg border border-none cursor-pointer transition-all duration-150 
              ${value.trim() ? "bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white" : "bg-white/5 text-slate-500 cursor-not-allowed"}`}
            disabled={!value && isLoading}
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
