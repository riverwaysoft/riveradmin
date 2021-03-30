import { DateTime, DateTimeFormatOptions } from 'luxon';
import React from 'react';

type Props = {
  date?: string;
  format?: DateTimeFormatOptions;
};

export const DateTimeColumn = (props: Props) => {
  const { date, format = DateTime.DATE_SHORT } = props;
  if (!date) {
    return null;
  }
  return <>{DateTime.fromISO(date).setLocale('ru').toLocaleString(format)}</>;
};
