import { createSlice } from '@reduxjs/toolkit'

const initialState = { user: {}, isLoggedIn: false }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  },
})

export const { setUser, setIsLoggedIn } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
