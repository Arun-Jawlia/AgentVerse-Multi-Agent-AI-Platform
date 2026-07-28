import { api } from "../apis/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    console.log(token);
    await handleLogin(token);
    console.log(data);
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
        <div className="w-85 bg-[#13151c] border-white/80 rounded-2xl p-7 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[17px] text-center font-semibold text-slate-100 tracking-tight">
              {" "}
              Welcome to AgentVerse
            </h2>
            <p className="text-[13px] text-center  text-slate-500 pb-4">
              {" "}
              Please login to continue using the app
            </p>
            <button
            onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-2.75 
            rounded-x1 text-sm font-medium text-black/90 bg-white hover:bg-gray-200
             transition-all duration-150 cursor-pointer"
            >
              <FcGoogle size={15} /> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
