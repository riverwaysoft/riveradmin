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
        <div className={styles.dropdownMenu}>
          <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
            <span className={'h5'}>
              <FormattedMessage id={'riveradmin.filters'} />
            </span>
            <div className={css({ display: 'flex', gap: '1rem' })}>
              <Button variant={'outline-primary'} onClick={() => listStore.resetFilters()}>
                <FormattedMessage id={'riveradmin.filters.reset'} />
              </Button>
              <Button variant={'primary'} type={'submit'}>
                <FormattedMessage id={'riveradmin.filters.apply'} />
              </Button>
            </div>
          </div>
          <div className={styles.filterList}>
            {listStore.availablePropertyFilters.map((gridFilter, i) => {
              if (gridFilter.type === 'date') {
                return (
                  <label key={i} className={styles.filterLabel}>
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <DateRangeFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'bool') {
                return (
                  <label
                    key={i}
                    className={css({ display: 'flex', gap: '0.5rem', alignItems: 'center' })}
                  >
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <BoolFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'input') {
                return (
                  <label key={i} className={styles.filterLabel}>
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <InputFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'enum') {
                return (
                  <label key={i} className={styles.filterLabel}>
                    <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />
                    <EnumFilter fieldName={gridFilter.property} dropdown={gridFilter.enum} />
                  </label>
                );
              }

              if (gridFilter.type === 'range') {
                return (
                  <div key={i}>
                    <label className={styles.filterLabel}>
                      <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />{' '}
                      <FormattedMessage id={`riveradmin.filters.gte`} />
                      <InputFilter fieldName={`${gridFilter.property}[gte]`} />
                    </label>

                    <label className={styles.filterLabel}>
                      <FormattedMessage id={`riveradmin.filters.labels.${gridFilter.property}`} />{' '}
                      <FormattedMessage id={`riveradmin.filters.lte`} />
                      <InputFilter fieldName={`${gridFilter.property}[lte]`} />
                    </label>
                  </div>
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

const styles = {
  dropdownMenu: css({
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1.5rem',
    minWidth: '600px',
    minHeight: '100%',
  }),
  filterList: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  }),
  filterLabel: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }),
};
