import React from 'react';
import { Dropdown, Form, InputGroup } from 'react-bootstrap';
import { AdminCalendar } from '../admin-calendar/admin-calendar';
import { formatDateRange } from '../format-date-range';
import { css } from '@emotion/css';
import { useTranslate } from '../../../../store/use-translate';

const CustomToggle = React.forwardRef(({ children, onClick, value }: any, ref) => (
  <InputGroup>
    <Form.Control
      className={css({ background: 'var(--white) !important', cursor: 'pointer' })}
      type={'text'}
      ref={ref as any}
      value={value}
      onClick={onClick}
      readOnly
    />
    <InputGroup.Append>
      <InputGroup.Text className={css({ padding: '4px 8px !important', cursor: 'pointer' })}>
        <i className={'mdi mdi-calendar mdi-18px'} />
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
));

type Props = {
  value?: [Date, Date];
  onChange: (range: [Date, Date]) => void;
};

export const DateRangePicker = (props: Props) => {
  const { value, onChange } = props;
  const t = useTranslate();

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id={'dateTimePicker'}
        value={value ? formatDateRange(value) : t('riveradmin.filters.date-range-not-selected')}
      />
      <Dropdown.Menu>
        <AdminCalendar value={value} onChange={onChange} />
      </Dropdown.Menu>
    </Dropdown>
  );
};
