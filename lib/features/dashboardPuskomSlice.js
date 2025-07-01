import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (periode) => {
    const res = await axios.get(`/api/puskom/dashboard?periode=${encodeURIComponent(periode)}`);
    return res.data;
  }
);

const dashboardSlicePuskom = createSlice({
  name: 'dashboard', 
  initialState: {
    jumlahMahasiswa: 0,
    jumlahKelas: 0,
    jumlahPendaftar: 0,
    jumlahPeserta: 0,
    jumlahPesertaLulus: 0,
    jumlahPesertaRemidial: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        const {
          jumlahMahasiswa,
          jumlahKelas,
          jumlahPendaftar,
          jumlahPeserta,
          jumlahPesertaLulus,
          jumlahPesertaRemidial,
        } = action.payload;

        state.jumlahMahasiswa = jumlahMahasiswa;
        state.jumlahKelas = jumlahKelas;
        state.jumlahPendaftar = jumlahPendaftar;
        state.jumlahPeserta = jumlahPeserta;
        state.jumlahPesertaLulus = jumlahPesertaLulus;
        state.jumlahPesertaRemidial = jumlahPesertaRemidial;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlicePuskom.reducer;
