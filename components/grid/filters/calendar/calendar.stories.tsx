import { useState } from 'react';
import { Calendar } from './calendar';

export default {
  component: Calendar,
  title: 'Calendar',
};

export const Default = () => {
  const current = new Date();
  const next = new Date(current.getTime() + 1000 * 60 * 60 * 2); // 2 hours
  const [value, onChange] = useState<[Date, Date]>([current, next]);

  return (
    <div style={{ width: '420px' }}>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
