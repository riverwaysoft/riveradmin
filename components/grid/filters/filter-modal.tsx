import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../../../model/hydra';
import { CrudStore } from '../../../store/crud-store';
import { BoolFilter } from './filters/bool-filter';
import { DateRangeFilter } from './filters/date-range-filter';

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
  crudStore: CrudStore<Entity>;
};

export const FilterModal = observer(<Entity extends HasId>(props: Props<Entity>) => {
  const { crudStore } = props;

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
              <Button variant={'outline-primary'} onClick={() => crudStore.resetFilters()}>
                <FormattedMessage id={'riveradmin.filters.reset'} />
              </Button>
              <Button variant={'primary'} type={'submit'}>
                <FormattedMessage id={'riveradmin.filters.apply'} />
              </Button>
            </div>
          </div>
          <div className={'d-flex flex-column align-items-start'} style={{ gap: '1rem' }}>
            {crudStore.availablePropertyFilters.map((gridFilter, i) => {
              if (gridFilter.type === 'date') {
                return (
                  <label key={i} className={'d-flex flex-column'} style={{ gap: '0.5rem' }}>
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <DateRangeFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'bool') {
                return (
                  <label key={i} className={'d-flex align-items-center'} style={{ gap: '0.5rem' }}>
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <BoolFilter fieldName={gridFilter.property} />
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
