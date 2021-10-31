import React from 'react';
import { RadioSwitcher } from './radio-switcher';
import { useToggle } from 'react-use';
import { mount } from '@cypress/react';
import { css } from '@emotion/css/macro';

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
