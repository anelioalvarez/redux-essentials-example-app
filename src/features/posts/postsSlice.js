import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = [
  {
    id: '1',
    date: '2021-01-31T23:58:58.788Z',
    title: 'Primera publicaion, vieja',
    content: 'hola a todes',
    user: '4',
  },
  {
    id: '2',
    date: '2021-01-31T23:58:58.788Z',
    title: 'Segunda publicacion, bro',
    content: 'algo mas de texto, claro',
    user: '4',
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
  }
})

export const {
  postAdded,
  postUpdated,
} = postsSlice.actions;

export default postsSlice.reducer;