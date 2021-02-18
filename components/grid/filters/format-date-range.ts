import { DateTime } from 'luxon';

export const formatDateRange = (range: [Date, Date]): string => {
  const [dateFrom, dateTo] = range;

  const dateFromFormatted = DateTime.fromJSDate(dateFrom).toLocaleString(DateTime.DATE_SHORT);
  const dateToFormatted = DateTime.fromJSDate(dateTo).toLocaleString(DateTime.DATE_SHORT);

  return `${dateFromFormatted} - ${dateToFormatted}`;
};
