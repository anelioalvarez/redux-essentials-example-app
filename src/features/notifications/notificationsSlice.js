import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";


export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  // 1er arg '_': este argumento se convierte en el primer argumento
  // del callback payload creator.
  
  // 2do arg '{}': este argumento para el payload creator es un objeto
  // thunkAPI que contiene varias funciones utiles y piezas de informacion
  // por ejemplo dispatch, getState para enviar mas acciones u obtener
  // el ULTIMO estado de la store
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled](state, action) {
      state.push(...action.payload);
      // Sort with newest first
      state.sort((notifA, notifB) => notifB.date.localeCompare(notifA.date));
    },
  }
})

export default notificationsSlice.reducer;

export const selectAllNotifications = state => state.notifications;