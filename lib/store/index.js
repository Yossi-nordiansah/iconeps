// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import kelasReducer from '../features/kelasSlice.js';
import kelasPuskomReducer from '../features/kelasPuskomSlice.js'
import dashboardSlicePusbas from '../features/dashboardPusbasSlice.js'

const store = configureStore({
  reducer: {
    kelas: kelasReducer,
    kelasPuskom: kelasPuskomReducer,
    dashboarPusbas: dashboardSlicePusbas
  },
});

export default store;
