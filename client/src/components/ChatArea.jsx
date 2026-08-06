import ChatNavbar from "./ChatNavbar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { getMessages } from "../features/chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMessages } from "../redux/messageSlice";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const handleGetMessage = async () => {
    const { data } = await getMessages(selectedConversation?._id);
    dispatch(setMessages(data));
  };

  useEffect(
    () => {
      if (!selectedConversation?._id) {
        dispatch(setMessages([]));
        return;
      }
      handleGetMessage();
    },
    [selectedConversation?._id],
    dispatch,
  );

  return (
    <div className="flex flex-1 flex-col">
      <ChatNavbar />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
