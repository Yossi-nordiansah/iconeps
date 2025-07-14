// import { prisma } from "@/lib/prisma";

// /**
//  * Mengembalikan nama periode dari tanggal pembayaran.
//  * @param {string} dateStr - Tanggal dalam format 'YYYY-MM-DD'
//  * @returns {Promise<string|null>}
//  */
// export async function getPeriodePuskomByTanggal(dateStr) {
//   const listPeriode = await prisma.periode_puskom.findMany();
//   const date = new Date(dateStr);
//   const year = date.getFullYear();

//   for (const periode of listPeriode) {
//     if (!periode.tanggal_mulai || !periode.tanggal_selesai || !periode.nama) continue;

//     const [startMonth, startDay] = periode.tanggal_mulai.slice(1).split("-").map(Number);
//     const [endMonth, endDay] = periode.tanggal_selesai.slice(1).split("-").map(Number);

//     let startDate = new Date(year, startMonth - 1, startDay);
//     let endDate = new Date(year, endMonth - 1, endDay);

//     // Tangani jika periode lintas tahun (contoh: 10-21 s.d. 03-20)
//     if (endDate < startDate) {
//       // Jika bulan sekarang <= bulan akhir (misal: Jan-Feb-Mar)
//       if (date.getMonth() + 1 <= endMonth) {
//         startDate.setFullYear(year - 1);
//         endDate.setFullYear(year);
//       } else {
//         startDate.setFullYear(year);
//         endDate.setFullYear(year + 1);
//       }
//     }

//     // Logika khusus: jika range 20 Okt - 31 Des => masuk periode I tahun depan
//     if (
//       startMonth === 10 && startDay === 21 &&
//       endMonth === 3 && endDay === 20 &&
//       date.getMonth() + 1 === 10 && date.getDate() >= 21
//     ) {
//       startDate.setFullYear(year);
//       endDate.setFullYear(year + 1);
//     }

//     if (date >= startDate && date <= endDate) {
//       return periode.nama;
//     }
//   }

//   return null;
// }

import { prisma } from "@/lib/prisma";

/**
 * Mengembalikan nama periode dari tanggal pembayaran, contoh:
 * "Periode I (Oktober 2024 - Maret 2025)" atau
 * "Periode II (Agustus - September 2025)"
 * 
 * @param {string} dateStr - Tanggal dalam format 'YYYY-MM-DD'
 * @returns {Promise<string|null>}
 */
export async function getPeriodePuskomByTanggal(dateStr) {
  const listPeriode = await prisma.periode_puskom.findMany();
  const date = new Date(dateStr);
  const currentYear = date.getFullYear();

  const monthNames = [
    "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  for (const periode of listPeriode) {
    if (!periode.tanggal_mulai || !periode.tanggal_selesai || !periode.nama) continue;

    const [startMonth, startDay] = periode.tanggal_mulai.slice(1).split("-").map(Number);
    const [endMonth, endDay] = periode.tanggal_selesai.slice(1).split("-").map(Number);

    let startDate = new Date(currentYear, startMonth - 1, startDay);
    let endDate = new Date(currentYear, endMonth - 1, endDay);

    // Penyesuaian tahun jika periode lintas tahun (misal Okt-Mar)
    if (endDate < startDate) {
      if (date.getMonth() + 1 <= endMonth) {
        startDate.setFullYear(currentYear - 1);
        endDate.setFullYear(currentYear);
      } else {
        startDate.setFullYear(currentYear);
        endDate.setFullYear(currentYear + 1);
      }
    }

    // Tambahan khusus: jika dari 21 Oktober s.d. Desember, dianggap masuk periode tahun berikutnya
    if (
      startMonth === 10 && startDay === 21 &&
      endMonth === 3 && endDay === 20 &&
      date.getMonth() + 1 === 10 && date.getDate() >= 21
    ) {
      startDate.setFullYear(currentYear);
      endDate.setFullYear(currentYear + 1);
    }

    if (date >= startDate && date <= endDate) {
      const startMonthName = monthNames[startMonth];
      const endMonthName = monthNames[endMonth];

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      let periodeLabel = "";

      if (startYear === endYear) {
        periodeLabel = `${periode.nama} (${startMonthName} - ${endMonthName} ${startYear})`;
      } else {
        periodeLabel = `${periode.nama} (${startMonthName} ${startYear} - ${endMonthName} ${endYear})`;
      }

      return periodeLabel;
    }
  }

  return null;
}

