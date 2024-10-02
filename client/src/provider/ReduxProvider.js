'use client'

import { store } from "@/redux/store/index"



const { Provider } = require("react-redux")


const ReduxProvider = ({ children }) =>
  <Provider store={store}>
    {children}
  </Provider>

export default ReduxProvider
