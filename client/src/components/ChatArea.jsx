import ChatNavbar from "./ChatNavbar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { getMessages } from "../features/chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setArtifacts, setMessages } from "../redux/messageSlice";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const handleGetMessage = async () => {
    const data = await getMessages(selectedConversation?._id);
    console.log(data)
    dispatch(setMessages(data));
    const latestArtifactsMessage = [...data].reverse().find(msg=> msg.artifacts && msg.artifacts.length > 0)
    dispatch(setArtifacts(latestArtifactsMessage?.artifacts || []));
  };

  useEffect(() => {
    if (!selectedConversation?._id) {
      dispatch(setMessages([]));
      return;
    }

    if (selectedConversation.title === "New Chat") {
      dispatch(setMessages([]));
      return;
    }

    handleGetMessage();
  }, [selectedConversation?._id]);

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <ChatNavbar />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
