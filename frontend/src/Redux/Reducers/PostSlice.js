import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { setAlert } from "./alert";

const initialState = {
  posts: [],
  post: null,
  error: {},
  loading: true,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsSuccess(state, action) {
      state.posts = action.payload;
      state.post = null;
      state.loading = false;
    },
    createPostSuccess(state, action) {
      state.posts.unshift(action.payload);
      state.loading = false;
    },
    postError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateLikes(state, action) {
      const { id, likes } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === id ? { ...post, likes } : post
      );
      state.loading = false;
    },
    removePost(state, action) {
      const { id } = action.payload;
      state.posts = state.posts.filter((post) => post._id !== id);
      state.loading = false;
    },
    getPostSuccess(state, action) {
      state.post = action.payload;
      state.loading = false;
    },
    addOrRemoveComment(state, action) {
      state.post = { ...state.post, comments: action.payload };
      state.loading = false;
    },
  },
});

export const {
  getPostsSuccess,
  createPostSuccess,
  postError,
  updateLikes,
  removePost,
  getPostSuccess,
  addOrRemoveComment,
} = postSlice.actions;

// Async Thunks
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch(getPostsSuccess(res.data));
  } catch (error) {
    dispatch(postError(error.response.data));
    console.log(error.response.data);
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts`, formData);
    dispatch(createPostSuccess(res.data));
    // dispatch(setAlert("Post created", "success"));
  } catch (error) {
    dispatch(postError(error.response.data));
    console.log(error.response.data);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch(updateLikes({ id, likes: res.data }));
  } catch (error) {
    dispatch(postError(error.response.data));
  }
};

export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch(updateLikes({ id, likes: res.data }));
  } catch (error) {
    dispatch(postError(error.response.data));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch(removePost(id));
    // dispatch(setAlert("Post deleted", "success"));
  } catch (error) {
    dispatch(postError(error.response.data));
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch(getPostSuccess(res.data));
  } catch (error) {
    dispatch(postError(error.response.data));
  }
};

export const addComment = (postId, text) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      text,
      config
    );
    dispatch(addOrRemoveComment(res.data));
    // dispatch(setAlert("Comment added", "success"));
  } catch (error) {
    dispatch(postError(error.response.data));
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch(addOrRemoveComment(res.data));
    // dispatch(setAlert("Comment removed", "success"));
    
  } catch (error) {
    dispatch(postError(error.response.data));
  }
};

export default postSlice.reducer;
