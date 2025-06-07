// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import kelasReducer from '../features/kelasSlice.js'

const store = configureStore({
  reducer: {
    kelas: kelasReducer,
  },
});

export default store;
