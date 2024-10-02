'use client'
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: ()=> [logger]
})
