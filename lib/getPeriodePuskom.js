export async function getPeriodePuskomByTanggal(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  if (month === 11 || month === 12) {
    return `Periode I = April - Mei ${year + 1}`;
  }

  if (month === 1 || month === 3) {
    return `Periode I = April - Mei ${year}`;
  }

  if (month >= 4 && month <= 7) {
    return `Periode II = Agustus - September ${year}`;
  }

  if (month >= 8 && month <= 10) {
    return `Periode III = November - Desember ${year}`;
  }

  return null;
}

