export function getTodayDateRange(date) {
  const inputDate = new Date(date);

  const endOfDay = new Date(inputDate);
  endOfDay.setUTCDate(endOfDay.getUTCDate());
  endOfDay.setUTCHours(23, 59, 59, 999);

  const startOfDay = new Date(inputDate);
  startOfDay.setUTCDate(startOfDay.getUTCDate() - 6);
  startOfDay.setUTCHours(0, 0, 0, 0);

  return {
    startOfDay: startOfDay.toISOString(),
    endDay: endOfDay.toISOString(),
  };
}
