import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'user',
  initialState: {isAuthenticated : false, isAuthChecked: false},
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true
      state.isAuthChecked = true
    },
    logoutUser: (state, action) => {
        state.isAuthenticated = false
        state.isAuthChecked = true
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;