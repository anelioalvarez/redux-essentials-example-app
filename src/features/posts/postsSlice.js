import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from '../../api/client';


const postsAdapter = createEntityAdapter({
  sortComparer: (post1, post2) => post2.date.localeCompare(post1.date),
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

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
      const post = state.entities[id];
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const post = state.entities[postId];
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
      postsAdapter.upsertMany(state, action.payload); // why not .setAll ?
    },
    [fetchPosts.rejected](state, action) {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [saveNewPost.fulfilled]: postsAdapter.addOne,
  }
})

export const {
  postAdded,
  postUpdated,
  reactionAdded,
} = postsSlice.actions;

export default postsSlice.reducer;


// Selectors
// (custom)
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => state.posts);

// (memoized)
export const selectPostsByUser = createSelector(
  //[selectAllPosts, (state, userId) => userId],
  selectAllPosts,
  (_, userId) => userId,
  (posts, userId) => posts.filter(post => post.user === userId)
)