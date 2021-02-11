import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
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

const notificationsAdapter = createEntityAdapter({
  sortComparer: (notifA, notifB) => notifB.date.localeCompare(notifA.date)
});

const initialState = notificationsAdapter.getInitialState();

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled](state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read;
      });
      notificationsAdapter.upsertMany(state, action.payload);
    },
  }
})

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors(state => state.notifications);