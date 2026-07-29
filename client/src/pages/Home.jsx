import { useSelector } from "react-redux";
import Login from "../components/Login";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      {!userData && (
        <Login />
      )}
    </div>
  );
};

export default Home;
