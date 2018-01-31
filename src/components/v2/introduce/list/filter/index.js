import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

const Filter = ({introduceStore}) => {
  const handleFilter = (filter) => {
    introduceStore.updateValue('filterInfo.applied', filter);
    introduceStore.getAssortmentC2();
  };
  const createList = () => {
    const data = [
      {key: 'ALL', value: '全部'},
      {key: 'APPLIED', value: '已申请'},
      {key: 'UNAPPLIED', value: '未申请'}
    ];
    const output = [];
    data.map(({key, value}) => {
      output.push(
        <li
          key={key}
          className={key === introduceStore.filterInfo.applied ? styles.active : ''}
          onClick={handleFilter.bind(null, key)}>{value}</li>
      );
    });
    return output;
  };
  return (
    <ul className={styles.filter}>
      {createList()}
    </ul>
  );
};
Filter.propTypes = {
  introduceStore: PropTypes.object,
  // uiStore: PropTypes.object,
};
export default inject('introduceStore')(observer(Filter));
