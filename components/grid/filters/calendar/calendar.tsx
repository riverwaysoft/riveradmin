import React from 'react';
import ReactCalendar from 'react-calendar';
import { assert } from 'ts-essentials';
import { ReactComponent as NextIcon } from './next.svg';
import { ReactComponent as PrevIcon } from './prev.svg';
import './calendar.scss';

type Props = {
  value?: [Date, Date];
  onChange: (value: [Date, Date]) => void;
};

export const Calendar = (props: Props) => {
  const { value, onChange } = props;

  return (
    <ReactCalendar
      selectRange
      showDoubleView
      prev2Label={null}
      next2Label={null}
      prevLabel={<PrevIcon />}
      nextLabel={<NextIcon />}
      onChange={(range) => {
        assert(Array.isArray(range));
        assert(range.length === 2);
        onChange(range as [Date, Date]);
      }}
      value={value || (null as any)}
    />
  );
};
