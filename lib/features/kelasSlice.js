// store/kelasSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPeriodes = createAsyncThunk('kelas/fetchPeriodes', async () => {
  const response = await axios.get("/api/pusbas/kelas");
  const periodes = [...new Set(response.data.map(item => item.periode))];
  return periodes;
});

const kelasSlice = createSlice({
  name: 'kelas',
  initialState: {
    periodes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeriodes.fulfilled, (state, action) => {
        state.loading = false;
        state.periodes = action.payload;
      })
      .addCase(fetchPeriodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default kelasSlice.reducer;
