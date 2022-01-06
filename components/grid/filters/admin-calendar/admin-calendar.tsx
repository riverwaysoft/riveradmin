import React from 'react';
import ReactCalendar from 'react-calendar';
import { assert } from 'ts-essentials';
import { NextIcon } from './next-icon';
import { PrevIcon } from './prev-icon';
import './admin-calendar.css';

type Props = {
  value?: [Date, Date];
  onChange: (value: [Date, Date]) => void;
};

export const AdminCalendar = (props: Props) => {
  const { value, onChange } = props;

  return (
    <ReactCalendar
      selectRange
      showDoubleView
      prev2Label={null}
      next2Label={null}
      prevLabel={<PrevIcon />}
      nextLabel={<NextIcon />}
      onChange={(range: any) => {
        assert(Array.isArray(range));
        assert(range.length === 2);
        onChange(range as [Date, Date]);
      }}
      value={value || (null as any)}
    />
  );
};
