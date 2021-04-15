import React from 'react';
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination';

type PageProps = {
  value: string;
  isActive: boolean;
  onClick: Function;
};

const Page = ({ value, isActive, onClick }: PageProps) => (
  <li className={isActive ? 'page-item active' : 'page-item'}>
    <button className="page-link" onClick={withPreventDefault(onClick)}>
      {value}
    </button>
  </li>
);

const WrapperComponent = ({ children,  totalItems }: { children: React.ReactNode, totalItems:number }) => (
  <ul className="pagination">
    {children}
    <div className={'align-self-center ml-2'}>Total {totalItems}</div>
  </ul>
);

const withPreventDefault = (fn: Function) => (event: any) => {
  event.preventDefault();
  fn();
};

const Ellipsis = ({ onClick }: { onClick: Function }) => (
  <li className="page-item">
    <button className="page-link" onClick={withPreventDefault(onClick)}>
      ...
    </button>
  </li>
);

const FirstPageLink = ({ onClick }: { onClick: Function }) => (
  <li className="page-item">
    <button className="page-link" onClick={withPreventDefault(onClick)}>
      &laquo;
    </button>
  </li>
);

const PreviousPageLink = ({ onClick }: { onClick: Function }) => (
  <li className="page-item">
    <button className="page-link" onClick={withPreventDefault(onClick)}>
      &lsaquo;
    </button>
  </li>
);

const NextPageLink = ({ onClick }: { onClick: Function }) => (
  <li className="page-item">
    <button className="page-link" onClick={withPreventDefault(onClick)}>
      &rsaquo;
    </button>
  </li>
);

const LastPageLink = ({ onClick }: { onClick: Function }) => (
  <li className="page-item">
    <button className="page-link" onClick={withPreventDefault(onClick)}>
      &raquo;
    </button>
  </li>
);

type DataGridPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems:number;
  onChange: (page: number) => void;
};

export const AdminGridPagination = createUltimatePagination({
  itemTypeToComponent: {
    [ITEM_TYPES.PAGE]: Page,
    [ITEM_TYPES.ELLIPSIS]: Ellipsis,
    [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
    [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
    [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
    [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink,
  },
  WrapperComponent: WrapperComponent,
}) as React.ComponentType<DataGridPaginationProps>;
