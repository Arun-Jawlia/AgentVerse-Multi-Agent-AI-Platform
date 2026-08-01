import { useSelector } from "react-redux";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      {!userData && <Login />}
      <Sidebar />
      <ChatArea />
      <Artifact />
    </div>
  );
};

export default Home;
