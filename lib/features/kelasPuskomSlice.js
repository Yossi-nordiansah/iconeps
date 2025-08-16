import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const fetchPeriodes = createAsyncThunk('kelasPuskom/fetchPeriodes', async () => {
  const response = await axios.get("/api/puskom/kelas");
  const periodes = [...new Set(response.data.map(item => item.periode_puskom))];
  return periodes;
});

export const fetchKelasByPeriode = createAsyncThunk('kelas/fetchKelasByPeriode', async (periode) => {
  const res = await axios.get(`/api/puskom/kelas?periode=${periode}`);
  return res.data;
}); 

const kelasSlice = createSlice({
  name: 'kelasPuskom',
  initialState: {
    periodes: [],
    selectedPeriodePuskom: '',
    kelas: [], 
    loading: false,
  },
  reducers: {
    setSelectedPeriodePuskom: (state, action) => {
      state.selectedPeriodePuskom = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodes.fulfilled, (state, action) => {
        state.periodes = action.payload;
        if (!state.selectedPeriodePuskom && action.payload.length > 0) {
          state.selectedPeriodePuskom = action.payload[action.payload.length - 1];
        }
      })
      .addCase(fetchKelasByPeriode.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKelasByPeriode.fulfilled, (state, action) => {
        state.kelas = action.payload;
        state.loading = false;
      });
  } 
});

export const { setSelectedPeriodePuskom } = kelasSlice.actions;
export default kelasSlice.reducer;
