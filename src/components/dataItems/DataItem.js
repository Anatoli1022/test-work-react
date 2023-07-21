import React from 'react';
import classNames from 'classnames/bind';
import styles from './DataItem.module.scss';

const cx = classNames.bind(styles);

const DataItem = ({ item }) => {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('information')}>
        <li className={cx('item')}>
          <span className={cx('info-text', 'id')}>{item.id}</span>
        </li>

        <li className={cx('item')}>
          <h5 className={cx('info-text', 'title')}>{item.title}</h5>
        </li>

        <li className={cx('item')}>
          <p className={cx('info-text', 'text')}>{item.body}</p>
        </li>
      </ul>
    </div>
  );
};

export default DataItem;
