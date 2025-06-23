// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import kelasReducer from '../features/kelasSlice.js';
import kelasPuskomReducer from '../features/kelasPuskomSlice.js'

const store = configureStore({
  reducer: {
    kelas: kelasReducer,
    kelasPuskom: kelasPuskomReducer
  },
});

export default store;
