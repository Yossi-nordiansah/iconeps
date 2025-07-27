// export async function getPeriodePuskomByTanggal(dateStr) {
//   const date = new Date(dateStr);
//   date.setHours(0, 0, 0, 0);

//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();

//   const makeDate = (y, m, d) => {
//     const dt = new Date(y, m - 1, d);
//     dt.setHours(0, 0, 0, 0);
//     return dt;
//   };

//   // Periode I bisa lintas tahun: 21 Okt - 20 Mar
//   const periodeIStart1 = makeDate(year - 1, 10, 21);
//   const periodeIEnd1 = makeDate(year, 3, 20);

//   const periodeIStart2 = makeDate(year, 10, 21);
//   const periodeIEnd2 = makeDate(year + 1, 3, 20);

//   // Cek jika masuk Periode I (entah lintas tahun atau akhir tahun)
//   if (date >= periodeIStart1 && date <= periodeIEnd1) {
//     return `Periode I = April - Juni ${periodeIEnd1.getFullYear()}`;
//   }
//   if (date >= periodeIStart2 && date <= periodeIEnd2) {
//     return `Periode I = April - Juni ${periodeIEnd2.getFullYear()}`;
//   }

//   // Periode II (21 Mar - 20 Jul)
//   const periodeIIStart = makeDate(year, 3, 21);
//   const periodeIIEnd = makeDate(year, 7, 20);
//   if (date >= periodeIIStart && date <= periodeIIEnd) {
//     return `Periode II = Agustus - September ${year}`;
//   }

//   // Periode III (21 Jul - 20 Okt)
//   const periodeIIIStart = makeDate(year, 7, 21);
//   const periodeIIIEnd = makeDate(year, 10, 20);
//   if (date >= periodeIIIStart && date <= periodeIIIEnd) {
//     return `Periode III = November - Desember ${year}`;
//   }

//   return null;
// }

export async function getPeriodePuskomByTanggal(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; // bulan dari 1–12
  const year = date.getFullYear();

  if (month === 11 || month === 12) {
    return `Periode I = April - Juni ${year + 1}`;
  }

  if (month === 1 || month === 2) {
    return `Periode I = April - Juni ${year}`;
  }

  if (month >= 3 && month <= 7) {
    return `Periode II = Agustus - September ${year}`;
  }

  if (month >= 8 && month <= 10) {
    return `Periode III = November - Desember ${year}`;
  }

  return null;
}

