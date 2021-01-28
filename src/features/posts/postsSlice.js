import { createSlice } from "@reduxjs/toolkit";


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

  }
})

export default postsSlice.reducer;