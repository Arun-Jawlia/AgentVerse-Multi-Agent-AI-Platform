import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import Home from "./pages/Home";
import { getCurrentUser } from "./features/getCurrentUser";
import { setUserData } from '../redux/userSlice';

const App = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(()=>{
    const getUser = async() =>{
      const data = await getCurrentUser()
      console.log(data)
      dispatch(setUserData(data))
    }
    getUser()
  },[])

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
