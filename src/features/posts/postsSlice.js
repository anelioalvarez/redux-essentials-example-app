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

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            },
          }
        }
      }
    },
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
      state.items = action.payload;
    },
    [fetchPosts.rejected](state, action) {
      state.status = 'failed';
      state.error = action.error.message;
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