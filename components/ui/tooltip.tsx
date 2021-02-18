import React from 'react';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';

type Props = {
  title: string | React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom';
};

export const AdminTooltip = (props: Props) => {
  const { title, children, placement = 'top' } = props;

  return (
    <OverlayTrigger
      placement={placement}
      overlay={<BootstrapTooltip id={'tooltip-top'}>{title}</BootstrapTooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};
