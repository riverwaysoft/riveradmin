import React from 'react';
import { HasId } from '../../../model/hydra';
import { ImpersonateService } from '../../../jwt/impersonate-service';
import { AdminTooltip } from '../../ui/tooltip';
import { FormattedMessage } from 'react-intl';
import { css, cx } from '@emotion/css';

type Props = {
  model: HasId;
  impersonateService: ImpersonateService;
};

export const ImpersonateAction = (props: Props) => {
  const { model, impersonateService } = props;

  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.impersonate-user'} />}>
      <i
        className={cx('mdi mdi-account-key text-success', css({ cursor: 'pointer' }))}
        onClick={async (event) => {
          event.stopPropagation();
          await impersonateService.openImpersonatePage(model);
        }}
      />
    </AdminTooltip>
  );
};
