import { createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const initialState = {
  items: [],
  status: "loading",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsFetching(state, action) {
      state.status = "loading";
    },
    commentsFetchingSuccess(state, action) {
      state.error = null;
      state.items = action.payload;
      state.status = "loaded";
    },
    commentsFetchingError(state, action) {
      state.status = "loaded";
      state.error = action.payload;
    },
  },
});

const { commentsFetching, commentsFetchingError, commentsFetchingSuccess } =
  commentsSlice.actions;

export const loadCommentsForPost = (postId) => async (dispatch) => {
  try {
    dispatch(commentsFetching());
    const { data } = await instance.get(`/posts/${postId}/comments`);
    dispatch(commentsFetchingSuccess(data));
  } catch (error) {
    dispatch(commentsFetchingError(error.message));
  }
};

export const commentsReducer = commentsSlice.reducer;
