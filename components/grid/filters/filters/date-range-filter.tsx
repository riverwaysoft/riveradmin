import { DateTime } from 'luxon';
import React from 'react';
import { Field } from 'react-final-form';
import { DateRangePicker } from '../date-range-picker/date-range-picker';

type Props = {
  fieldName: string;
};

export const DateRangeFilter = (props: Props) => {
  const { fieldName } = props;

  return (
    <Field name={fieldName} groupClassName={'mb-0'}>
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
