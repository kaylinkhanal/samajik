'use client'

const { Provider } = require("react-redux")
const { store } = require("./store")

const ReduxProvider = ({ children }) =>
  <Provider store={store}>
    {children}
  </Provider>

export default ReduxProvider
