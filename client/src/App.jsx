import {signInWithPopup} from 'firebase/auth'
import { auth, googleProvider } from './utils/firebase'

const App = () => {

  const handleGoogleAuth = async () =>{
   const data =  await signInWithPopup(auth, googleProvider)
   console.log(data)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button onClick={handleGoogleAuth} className="p-2 text-white bg-black cursor-pointer hover:text-gray-700">
        Firebase Login
      </button>
    </div>
  )
}

export default App