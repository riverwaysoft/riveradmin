import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ClipboardStore } from './clipboard-store';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { css, cx } from '@emotion/css/macro';

type Props = {
  uuid: string;
  title?: string;
};

export const UuidColumn = observer((props: Props) => {
  const { uuid, title } = props;
  const [clipboardStore] = useState(() => new ClipboardStore());

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        '&:hover .copy': {
          opacity: 1,
        },
      })}
    >
      <span>
        {title} {uuid.slice(0, 6) + '...'}
      </span>
      <span
        className={cx('copy', css({ opacity: 0, transition: 'opacity 0.3s', cursor: 'pointer' }))}
        onMouseLeave={clipboardStore.forgetCopied}
        onClick={(event) => {
          event.stopPropagation();
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
            className={cx('mdi mdi-18px', {
              'mdi-clipboard-check-multiple-outline': clipboardStore.isCopied,
              'mdi-clipboard-multiple-outline': !clipboardStore.isCopied,
            })}
          />
        </OverlayTrigger>
      </span>
    </div>
  );
});
