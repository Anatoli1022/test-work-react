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
  const [sortState, setSortState] = useState({
    id: 'asc',
    title: 'asc',
    body: 'asc',
  });
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

  const applySort = (column) => {
    setSortState((prevState) => ({
      ...prevState,
      [column]: prevState[column] === 'asc' ? 'desc' : 'asc',
    }));

    const sortedData = filteredData.slice().sort((a, b) => {
      const sortOrder = sortState[column] === 'asc' ? 1 : -1;

      if (column === 'id') return sortOrder * (a.id - b.id);
      if (column === 'title')
        return sortOrder * (a.title.length - b.title.length);
      if (column === 'body') return sortOrder * (a.body.length - b.body.length);

      return 0;
    });

    setFilteredData(sortedData);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <SearchBar data={data} setFilteredData={setFilteredData} />

        <div className={cx('heading')}>
          <button className={cx('button')} onClick={() => applySort('id')}>
            id
          </button>
          <button className={cx('button')} onClick={() => applySort('title')}>
            Заголовок
          </button>
          <button className={cx('button')} onClick={() => applySort('body')}>
            Описание
          </button>
        </div>
        <table>
          {currentItems.map((item) => (
            <DataItem key={item.id} item={item} />
          ))}
        </table>
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
