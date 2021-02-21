import React, { useCallback, useState } from 'react';
import { RadioSwitcher } from './radio-switcher';

export default {
  title: 'RadioSwitcher',
  component: RadioSwitcher,
};

export const Default = () => {
  const [isOn, setIsOn] = useState(true);
  const [isYes, setYes] = useState(false);

  return (
    <div className={'d-flex'} style={{ gap: '2rem' }}>
      <RadioSwitcher isOn={isOn} onToggle={() => setIsOn(!isOn)} />
      <RadioSwitcher isOn={isYes} onToggle={() => setYes(!isYes)} />
    </div>
  );
};
