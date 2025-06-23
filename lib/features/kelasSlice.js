// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchPeriodes = createAsyncThunk('kelas/fetchPeriodes', async () => { 
//   const response = await axios.get("/api/pusbas/kelas");
//   const periodes = [...new Set(response.data.map(item => item.periode))];
//   return periodes;
// });

// export const fetchKelasByPeriode = createAsyncThunk('kelas/fetchKelasByPeriode', async (periode) => {
//   const res = await axios.get(`/api/pusbas/kelas?periode=${periode}`);
//   return res.data;
// });

// const kelasSlice = createSlice({
//   name: 'kelas',
//   initialState: {
//     periodes: [],
//     selectedPeriode: '',
//     kelas: [],
//     loading: false,
//   },
//   reducers: {
//     setSelectedPeriode: (state, action) => {
//       state.selectedPeriode = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPeriodes.fulfilled, (state, action) => {
//         state.periodes = action.payload;
//         if (!state.selectedPeriode && action.payload.length > 0) {
//           state.selectedPeriode = action.payload[action.payload.length - 1]; // Periode terbaru
//         }
//       })
//       .addCase(fetchKelasByPeriode.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchKelasByPeriode.fulfilled, (state, action) => {
//         state.kelas = action.payload;
//         state.loading = false;
//       });
//   } 
// });

// export const { setSelectedPeriode } = kelasSlice.actions;
// export default kelasSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPeriodes = createAsyncThunk('kelas/fetchPeriodes', async () => { 
  const response = await axios.get("/api/pusbas/kelas");
  const periodes = [...new Set(response.data.map(item => item.periode))];
  return periodes;
});

export const fetchKelasByPeriode = createAsyncThunk('kelas/fetchKelasByPeriode', async (periode) => {
  const res = await axios.get(`/api/pusbas/kelas?periode=${periode}`);
  return res.data;
});

const kelasSlice = createSlice({
  name: 'kelas',
  initialState: {
    periodes: [],
    selectedPeriodePusbas: '', 
    kelas: [],
    loading: false,
  },
  reducers: {
    setSelectedPeriodePusbas: (state, action) => { 
      state.selectedPeriodePusbas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodes.fulfilled, (state, action) => {
        state.periodes = action.payload;
        if (!state.selectedPeriodePusbas && action.payload.length > 0) {
          state.selectedPeriodePusbas = action.payload[action.payload.length - 1]; 
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

export const { setSelectedPeriodePusbas } = kelasSlice.actions; 
export default kelasSlice.reducer;
