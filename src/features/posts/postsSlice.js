import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialReactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
};

const initialState = [
  {
    id: '1',
    date: '2021-01-11T23:58:58.788Z',
    title: 'Primera publicaion, vieja',
    content: 'hola a todes',
    user: '2',
    reactions: initialReactions,
  },
  {
    id: '2',
    date: '2021-01-31T23:58:58.788Z',
    title: 'Segunda publicacion, bro',
    content: 'algo mas de texto, claro',
    user: '4',
    reactions: initialReactions,
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: initialReactions,
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const post = state.find(post => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const post = state.find(post => post.id === postId);
      if (post) {
        ++post.reactions[reaction];
      }
    },
  }
})

export const {
  postAdded,
  postUpdated,
  reactionAdded,
} = postsSlice.actions;

export default postsSlice.reducer;