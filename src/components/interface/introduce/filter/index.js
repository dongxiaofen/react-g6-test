import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

function Filter({interfaceStore}) {
  const handleFilter = (key) => {
    // console.log(key);
    interfaceStore.updateValue('filterInfo.type', key);
  };
  const createFilter = () => {
    const filterData = interfaceStore.interfaceType.data;
    if (filterData) {
      const dataArr = Object.keys(filterData);
      return dataArr.map((item) => {
        return (
          <div key={item} className={`${styles['fiter-item']} ${item === interfaceStore.filterInfo.type ? styles.active : ''}`} onClick={handleFilter.bind(this, item)}>{filterData[item]}</div>
        );
      });
    }
  };
  return (
    <div className={styles.filter}>
      <span className={styles['filter-title']}>接口类别:</span>
      <div className={styles['filter-cont']}>
        <div className={`${styles['fiter-item']} ${interfaceStore.filterInfo.type === '' ? styles.active : ''}`} onClick={handleFilter.bind(this, '')}>全部</div>
        {createFilter()}
      </div>
    </div>
  );
}

Filter.propTypes = {
  interfaceStore: PropTypes.object,
};
// export default observer(Filter);
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 100
  }),
})(inject('interfaceStore')(observer(Filter)));
