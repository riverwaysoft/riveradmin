import React from 'react';
import { HasId } from '../../../model/hydra';
import { ImpersonateService } from '../../../jwt/impersonate-service';
import { AdminTooltip } from '../../ui/tooltip';
import { css, cx } from '@emotion/css';
import { useTranslate } from '../../../store/use-translate';

type Props = {
  model: HasId;
  impersonateService: ImpersonateService;
};

export const ImpersonateAction = (props: Props) => {
  const { model, impersonateService } = props;
  const t = useTranslate();

  return (
    <AdminTooltip title={t('riveradmin.impersonate-user')}>
      <i
        className={cx('mdi mdi-account-key text-success', css({ cursor: 'pointer' }))}
        onClick={async (event) => {
          event.stopPropagation();
          event.preventDefault();
          await impersonateService.openImpersonatePage(model);
        }}
      />
    </AdminTooltip>
  );
};
