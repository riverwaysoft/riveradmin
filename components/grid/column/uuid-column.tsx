import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ClipboardStore } from './clipboard-store';
import styles from './uuid-column.module.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

type Props = {
  uuid: string;
  title?: string;
};

export const UuidColumn = observer((props: Props) => {
  const { uuid, title } = props;
  const [clipboardStore] = useState(() => new ClipboardStore());

  return (
    <div className={styles.uuidColumn}>
      <span>
        {title} {uuid.slice(0, 6) + '...'}
      </span>
      <span
        className={styles.copy}
        onMouseLeave={clipboardStore.forgetCopied}
        onClick={() => {
          clipboardStore.copyToClipboard(uuid);
        }}
      >
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="button-tooltip" {...props}>
              <FormattedMessage
                id={clipboardStore.isCopied ? 'riveradmin.copied' : 'riveradmin.copy'}
              />
            </Tooltip>
          }
        >
          <i
            className={classNames('mdi mdi-18px', {
              'mdi-clipboard-check-multiple-outline': clipboardStore.isCopied,
              'mdi-clipboard-multiple-outline': !clipboardStore.isCopied,
            })}
          />
        </OverlayTrigger>
      </span>
    </div>
  );
});
