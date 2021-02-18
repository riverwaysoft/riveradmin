import React from 'react';
import { RadioSwitcher } from './radio-switcher';
import { useToggle } from 'react-use';

export default {
  title: 'RadioSwitcher',
  component: RadioSwitcher,
};

export const Default = () => {
  const [isOn, toggleOn] = useToggle(true);
  const [isYes, toggleYes] = useToggle(false);

  return (
    <div className={'d-flex'} style={{ gap: '2rem' }}>
      <RadioSwitcher isOn={isOn} onToggle={toggleOn} />
      <RadioSwitcher isOn={isYes} onToggle={toggleYes} />
    </div>
  );
};
