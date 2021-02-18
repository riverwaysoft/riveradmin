import { DateTime } from 'luxon';
import React from 'react';

type Props = {
  date?: string;
};

export const DateTimeColumn = (props: Props) => {
  const { date } = props;
  if (!date) {
    return null;
  }
  return <>{DateTime.fromISO(date).setLocale('ru').toLocaleString(DateTime.DATE_SHORT)}</>;
};
