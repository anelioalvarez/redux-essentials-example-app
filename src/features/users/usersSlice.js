import { createSlice } from '@reduxjs/toolkit';


const initialState = [
  { id: '1', name: 'Gustavo Alvarez' },
  { id: '2', name: 'Graciela Godoy' },
  { id: '3', name: 'Ariel Alvarez' },
  { id: '4', name: 'Isabel Cobayo' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
})

export default usersSlice.reducer;