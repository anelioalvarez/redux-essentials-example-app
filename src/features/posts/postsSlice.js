import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = [
  {
    id: 1,
    title: 'Primera publicaion, vieja',
    content: 'hola a todes'
  },
  {
    id: 2,
    title: 'Segunda publicacion, bro',
    content: 'algo mas de texto, claro'
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
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
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