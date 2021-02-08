import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../api/client';


const initialState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts;
})

export const saveNewPost = createAsyncThunk(
  'posts/saveNewPost',
  // The payload creator receives the partial { title, content, user } object
  async initialPost => {
    const response = await client.post('/fakeApi/posts', { post: initialPost });
    return response.post;
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const post = state.items.find(post => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const post = state.items.find(post => post.id === postId);
      if (post) {
        ++post.reactions[reaction];
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending](state, action) {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled](state, action) {
      state.status = 'succeeded';
      state.items = state.items.concat(action.payload);
    },
    [fetchPosts.rejected](state, action) {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [saveNewPost.fulfilled](state, action) {
      state.items.push(action.payload);
    },
  }
})

export const {
  postAdded,
  postUpdated,
  reactionAdded,
} = postsSlice.actions;

export default postsSlice.reducer;


// Selectors
export const selectAllPosts = state => state.posts.items;

export const selectPostById = (state, postId) => (
  selectAllPosts(state).find(post => post.id === postId)
)