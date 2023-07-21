import React from 'react';

import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={cx('navigation')}>
      <ul className={cx('pagination')}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={cx(number === currentPage ? 'active' : '')}
          >
            <button onClick={() => paginate(number)} className={cx('button')}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
