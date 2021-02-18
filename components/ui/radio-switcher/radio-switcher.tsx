import React from 'react';
import styles from './radio-switcher.module.scss';
import cn from 'classnames';

type Props = {
  isOn: boolean;
  onToggle: () => void;
};

export const RadioSwitcher = (props: Props) => {
  const { isOn, onToggle } = props;

  return (
    <label
      className={cn(styles.switcher, {
        [styles.isOn]: isOn,
      })}
    >
      <input type="checkbox" className={styles.nativeInput} checked={isOn} onChange={onToggle} />
      <div className={styles.cursor} />
    </label>
  );
};
