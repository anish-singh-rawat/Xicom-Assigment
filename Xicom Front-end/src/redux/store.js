import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import registerSlice from "./slices/registerSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
