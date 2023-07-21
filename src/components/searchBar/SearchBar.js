import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';

import search from '../../images/search.svg';

const cx = classNames.bind(styles);

const SearchBar = ({ data, setFilteredData }) => {
  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.body.toLowerCase().includes(keyword)
    );
    setFilteredData(filteredData);
  };

  return (
    <div className={cx('wrapper-search')}>
      <input
        type="text"
        className={cx('search')}
        placeholder="Поиск"
        onChange={handleSearch}
      />
      <img
        src={search}
        alt=""
        loading="eager"
        aria-hidden="true"
        className={cx('search-image')}
      />
    </div>
  );
};

export default SearchBar;
