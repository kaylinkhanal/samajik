import { createSlice } from '@reduxjs/toolkit'

const initialState = { userDetails: {} }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userDetails = action.payload
    },
    setLogout: () => {
      return initialState
    },
  },
})

export const { setLogin, setLogout } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
