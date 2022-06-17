import React from 'react';
import { css, cx } from '@emotion/css';

type Props<T extends string | number> = {
  tabs: { title: string; key: T }[];
  selectedTab: T;
  onSelectTab: (tab: { title: string; key: T }) => void;
};

export const AdminTabs = <T extends string | number>(props: Props<T>) => {
  const { tabs, onSelectTab, selectedTab } = props;

  return (
    <ul className="nav nav-pills">
      {tabs.map((tab) => (
        <li className={cx('nav-item', css({ cursor: 'pointer' }))} key={tab.key}>
          <div
            onClick={() => {
              onSelectTab(tab);
            }}
            className={cx('nav-link', {
              active: tab.key === selectedTab,
            })}
          >
            {tab.title}
          </div>
        </li>
      ))}
    </ul>
  );
};
