import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  artifacts:[],
  isLoading: false
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setArtifacts: (state, action) => {
      state.artifacts = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
});

export const { setMessages, addMessage, setArtifacts, setIsLoading } = messageSlice.actions;
export default messageSlice.reducer;
