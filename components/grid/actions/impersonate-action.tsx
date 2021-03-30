import React from 'react';
import { HydraMember } from '../../../model/hydra';
import { ImpersonateService } from '../../../jwt/impersonate-service';
import { AdminTooltip } from '../../ui/tooltip';
import { FormattedMessage } from 'react-intl';

type Props = {
  model: HydraMember;
  impersonateService: ImpersonateService;
};

export const ImpersonateAction = (props: Props) => {
  const { model, impersonateService } = props;

  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.impersonate-user'} />}>
      <i
        className={'mdi mdi-account-key text-success cursor-pointer'}
        onClick={async () => {
          await impersonateService.openImpersonatePage(model);
        }}
      />
    </AdminTooltip>
  );
};
