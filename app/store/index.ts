import {configureStore } from "@reduxjs/toolkit";
import AllInfoSlice from "./redux-mainPage";
import counterReducer from "./redux-cart";

const store = configureStore({
    reducer: { apiInfo: AllInfoSlice.reducer , counter:counterReducer},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, 
      }),
  });
  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;