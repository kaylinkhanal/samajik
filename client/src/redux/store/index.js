'use client'
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ 
  user: userReducer,
})
const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: ()=> [logger]
})

export const persistor = persistStore(store);
