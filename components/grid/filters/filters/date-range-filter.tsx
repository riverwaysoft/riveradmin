import { DateTime } from 'luxon';
import React from 'react';
import { Field } from 'react-final-form';
import { DateRangePicker } from '../date-range-picker/date-range-picker';
import { css } from '@emotion/css/macro';

type Props = {
  fieldName: string;
};

export const DateRangeFilter = (props: Props) => {
  const { fieldName } = props;

  return (
    <Field name={fieldName} groupClassName={css({ marginBottom: 0 })}>
      {({ input }) => (
        <DateRangePicker
          value={
            input.value
              ? [
                  DateTime.fromSQL(input.value.after).toJSDate(),
                  DateTime.fromSQL(input.value.before).toJSDate(),
                ]
              : undefined
          }
          onChange={(range) => {
            const [after, before] = range;
            const rangeAsDate =
              after && before
                ? {
                    after: DateTime.fromJSDate(after).toSQL(),
                    before: DateTime.fromJSDate(before).toSQL(),
                  }
                : undefined;

            input.onChange(rangeAsDate);
          }}
        />
      )}
    </Field>
  );
};
