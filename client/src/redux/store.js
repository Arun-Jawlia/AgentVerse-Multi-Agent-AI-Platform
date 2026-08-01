import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userSlice'
import conversationReducer from './converstationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    converstation : conversationReducer
  },
})