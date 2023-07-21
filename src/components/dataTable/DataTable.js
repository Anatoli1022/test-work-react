import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import DataItem from '../dataItems/DataItem';
import SearchBar from '../searchBar/SearchBar';

import Pagination from '../pagination/Pagination';

import styles from './DataTable.module.scss';

const cx = classNames.bind(styles);

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Pagination
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={cx('container')}>
    <div className={cx('wrapper')}>
    <SearchBar data={data} setFilteredData={setFilteredData} />
      <div className={cx('heading')}>
        <span className={cx('text')}>id</span>
        <p className={cx('text')}>Заголовок</p>
        <p className={cx('text')}>Описание</p>
      </div>
      {currentItems.map((item) => (
        <DataItem key={item.id} item={item} />
      ))}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
    </div>
  );
};

export default DataTable;
