import { useState } from 'react';
import { AdminCalendar } from './admin-calendar';
import { mount } from '@cypress/react';

const Default = () => {
  const current = new Date();
  const next = new Date(current.getTime() + 1000 * 60 * 60 * 2); // 2 hours
  const [value, onChange] = useState<[Date, Date]>([current, next]);

  return (
    <div style={{ width: '420px' }}>
      <AdminCalendar onChange={onChange} value={value} />
    </div>
  );
};

it('mounts', () => {
  cy.viewport('macbook-11');
  mount(<Default />);
});
