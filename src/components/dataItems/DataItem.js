import React from 'react';
import classNames from 'classnames/bind';
import styles from './DataItem.module.scss';

const cx = classNames.bind(styles);

const DataItem = ({ item }) => {
  return (
    <tr className={cx('information')}>
      <th className={cx('item')}> {item.id}</th>
      <th className={cx('item')}>{item.title}</th>
      <th className={cx('item')}> {item.body}</th>
    </tr>
  );
};

export default DataItem;
