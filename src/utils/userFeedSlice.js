import { createSlice } from "@reduxjs/toolkit"

const userFeedSlice = createSlice({
  name: 'user',
  initialState: {page : 1, movies: []},
  reducers: {
    getFeed: (state, action) => {
        state.movies = action.payload.movies;
        state.page = action.payload.page || 1;
    },
    updatePageNo: (state, action) => {
      state.page =  action.payload || 1;
    }
  
  }
})

export const { getFeed, updatePageNo } = userFeedSlice.actions;
export default userFeedSlice.reducer;