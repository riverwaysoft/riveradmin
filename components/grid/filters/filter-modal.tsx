import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { HydraMember } from '../../../model/hydra';
import { CrudStore } from '../../../store/crud-store';
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

type Props<Entity extends HydraMember> = {
  crudStore: CrudStore<Entity>;
};

export const FilterModal = observer(<Entity extends HydraMember>(props: Props<Entity>) => {
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
          <div>
            {crudStore.availablePropertyFilters.map((gridFilter, i) => (
              <label key={i}>
                <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                {gridFilter.type === 'date' ? (
                  <DateRangeFilter fieldName={gridFilter.property} />
                ) : null}
              </label>
            ))}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
});
