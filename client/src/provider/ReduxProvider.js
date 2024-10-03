'use client'

import { persistor, store } from "@/redux/store/index"
import { PersistGate } from "redux-persist/integration/react"



const { Provider } = require("react-redux")


const ReduxProvider = ({ children }) =>
  <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          {children}
          </PersistGate>
  </Provider>

export default ReduxProvider
