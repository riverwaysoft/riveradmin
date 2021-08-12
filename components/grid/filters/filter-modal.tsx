import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../../../model/hydra';
import { ListStore } from '../../../store/list-store';
import { BoolFilter } from './filters/bool-filter';
import { DateRangeFilter } from './filters/date-range-filter';
import { InputFilter } from './filters/input-filter';
import { EnumFilter } from './filters/enum-filter';
import { css } from '@emotion/css/macro';

const CustomToggle = React.forwardRef(({ children, onClick }: any, ref) => (
  <Button
    variant="outline-primary"
    ref={ref as any}
    onClick={(e) => {
      onClick(e);
    }}
  >
    {children}
  </Button>
));

type Props<Entity extends HasId> = {
  listStore: ListStore<Entity>;
};

export const FilterModal = observer(<Entity extends HasId>(props: Props<Entity>) => {
  const { listStore } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id={'parent'}>
        + <FormattedMessage id={'riveradmin.filters.add'} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div
          className={'d-flex flex-column px-4 py-3'}
          style={{ minWidth: '600px', minHeight: '100%' }}
        >
          <div className={'d-flex justify-content-between'}>
            <span className={'h5'}>
              <FormattedMessage id={'riveradmin.filters'} />
            </span>
            <div className={'d-flex'} style={{ gap: '1rem' }}>
              <Button variant={'outline-primary'} onClick={() => listStore.resetFilters()}>
                <FormattedMessage id={'riveradmin.filters.reset'} />
              </Button>
              <Button variant={'primary'} type={'submit'}>
                <FormattedMessage id={'riveradmin.filters.apply'} />
              </Button>
            </div>
          </div>
          <div className={'d-flex flex-column align-items-start'} style={{ gap: '1rem' }}>
            {listStore.availablePropertyFilters.map((gridFilter, i) => {
              if (gridFilter.type === 'date') {
                return (
                  <label
                    key={i}
                    className={css`
                      display: flex;
                      flex-direction: column;
                      gap: 0.5rem;
                    `}
                  >
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <DateRangeFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'bool') {
                return (
                  <label
                    key={i}
                    className={css`
                      display: flex;
                      align-items: center;
                      gap: 0.5rem;
                    `}
                  >
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <BoolFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'input') {
                return (
                  <label
                    key={i}
                    className={css`
                      display: flex;
                      flex-direction: column;
                      gap: 0.5rem;
                    `}
                  >
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <InputFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'enum') {
                return (
                  <label
                    key={i}
                    className={css`
                      display: flex;
                      flex-direction: column;
                      gap: 0.5rem;
                    `}
                  >
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <EnumFilter fieldName={gridFilter.property} dropdown={gridFilter.enum} />
                  </label>
                );
              }

              return null;
            })}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
});
