import React from 'react';
import { AdminTooltip } from '../../ui/tooltip';
import { css, cx } from '@emotion/css';
import { useTranslate } from '../../../store/use-translate';

type Props = {
  impersonate: () => Promise<unknown>;
  tooltip?: string;
};

export const ImpersonateAction = (props: Props) => {
  const { impersonate } = props;
  const t = useTranslate();

  return (
    <AdminTooltip title={props.tooltip ?? t('riveradmin.impersonate-user')}>
      <i
        className={cx('mdi mdi-account-key text-success', css({ cursor: 'pointer' }))}
        onClick={async (event) => {
          event.stopPropagation();
          event.preventDefault();
          await impersonate();
        }}
      />
    </AdminTooltip>
  );
};
