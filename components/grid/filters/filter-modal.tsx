import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { HasId } from '../../../model/hydra';
import { ListStore } from '../../../store/list-store';
import { BoolFilter } from './filters/bool-filter';
import { DateRangeFilter } from './filters/date-range-filter';
import { InputFilter } from './filters/input-filter';
import { EnumFilter } from './filters/enum-filter';
import { css } from '@emotion/css/macro';
import { EntityDropdownFilter } from './filters/entity-dropdown-filter';
import { useTranslate } from '../../../store/use-translate';

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

const filterLabelStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

type Props<Entity extends HasId> = {
  listStore: ListStore<Entity>;
};

export const FilterModal = observer(<Entity extends HasId>(props: Props<Entity>) => {
  const { listStore } = props;
  const t = useTranslate();

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id={'parent'}>
        + {t('riveradmin.filters.add')}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1.5rem',
            minWidth: 600,
            minHeight: '100%',
          })}
        >
          <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
            <span className={'h5'}>{t('riveradmin.filters')}</span>
            <div className={css({ display: 'flex', gap: '1rem' })}>
              <Button variant={'outline-primary'} onClick={() => listStore.resetFilters()}>
                {t('riveradmin.filters.reset')}
              </Button>
              <Button variant={'primary'} type={'submit'}>
                {t('riveradmin.filters.apply')}
              </Button>
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
            })}
          >
            {listStore.availablePropertyFilters.map((gridFilter, i) => {
              if (gridFilter.type === 'date') {
                return (
                  <label key={i} className={filterLabelStyles}>
                    {t(`riveradmin.filters.labels.${gridFilter.property}`)}
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
                    {t(`riveradmin.filters.labels.${gridFilter.property}`)}
                    <BoolFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'input') {
                return (
                  <label key={i} className={filterLabelStyles}>
                    {t(`riveradmin.filters.labels.${gridFilter.property}`)}
                    <InputFilter fieldName={gridFilter.property} />
                  </label>
                );
              }

              if (gridFilter.type === 'enum') {
                return (
                  <label key={i} className={filterLabelStyles}>
                    {t(`riveradmin.filters.labels.${gridFilter.property}`)}
                    <EnumFilter fieldName={gridFilter.property} dropdown={gridFilter.enum} />
                  </label>
                );
              }

              if (gridFilter.type === 'entity_dropdown') {
                return (
                  <label key={i} className={filterLabelStyles}>
                    {t(`riveradmin.filters.labels.${gridFilter.property}`)}
                    <EntityDropdownFilter
                      fieldName={gridFilter.property}
                      labelKey={gridFilter.labelKey}
                      endpoint={gridFilter.endpoint}
                    />
                  </label>
                );
              }

              if (gridFilter.type === 'range') {
                return (
                  <div key={i}>
                    <label className={filterLabelStyles}>
                      {t(`riveradmin.filters.labels.${gridFilter.property}`)}{' '}
                      {t(`riveradmin.filters.gte`)}
                      <InputFilter fieldName={`${gridFilter.property}[gte]`} />
                    </label>

                    <label className={filterLabelStyles}>
                      {t(`riveradmin.filters.labels.${gridFilter.property}`)}{' '}
                      {t(`riveradmin.filters.lte`)}
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
