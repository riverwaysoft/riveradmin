import React from 'react';
import { Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useRiverAdminStore } from '../../../../store/use-riveradmin-store';
import { Calendar } from '../calendar/calendar';
import { formatDateRange } from '../format-date-range';
import { css } from '@emotion/css/macro';

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
  const { translator } = useRiverAdminStore();

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id={'dateTimePicker'}
        value={
          value
            ? formatDateRange(value)
            : translator.translate('riveradmin.filters.date-range-not-selected')
        }
      />
      <Dropdown.Menu>
        <Calendar value={value} onChange={onChange} />
      </Dropdown.Menu>
    </Dropdown>
  );
};
