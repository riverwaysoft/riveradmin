// @ts-nocheck
import React, { useState } from 'react';
import { RadioSwitcher } from './radio-switcher';
import { mount } from '@cypress/react';
import { css } from '@emotion/css';

const useToggle = (initial: boolean) => {
  const [isOn, setIsOn] = useState(initial);
  return [isOn, () => setIsOn(!isOn)];
};

const Default = () => {
  const [isOn, toggleOn] = useToggle(true);
  const [isYes, toggleYes] = useToggle(false);

  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: 32 })}>
      <RadioSwitcher isOn={isOn} onToggle={toggleOn} />
      <RadioSwitcher isOn={isYes} onToggle={toggleYes} />
    </div>
  );
};

it('mounts', () => {
  mount(<Default />);
});
