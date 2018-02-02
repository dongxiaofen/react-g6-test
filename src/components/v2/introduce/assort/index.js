import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Icon } from 'antd';
import { loadingComp } from 'components/hoc';

const Assort = ({ introduceStore, uiStore }) => {
  const handleFilter = (id) => {
    introduceStore.updateValue('filterInfo.classificationId', id);
    if (uiStore.uiState.introducePager.index === 1) {
      introduceStore.getAssortmentC2();
    } else {
      uiStore.updateUiStore('introducePager.index', 1);
    }
  };
  const createList = () => {
    const assortment = introduceStore.assortment.content;
    const output = [];
    assortment.map((item, idx) => {
      output.push(
        <li key={idx} className={introduceStore.filterInfo.classificationId === item.id ? styles.active : ''} onClick={handleFilter.bind(null, item.id)}><Icon type="appstore-o" /> {item.name}</li>
      );
    });
    return output;
  };
  return (
    <ul className={styles.filters}>
      <li key="all" className={introduceStore.filterInfo.classificationId === '' ? styles.active : ''} onClick={handleFilter.bind(null, '')}><Icon type="appstore-o" /> 所有服务</li>
      {
        createList()
      }
    </ul>
  );
};
Assort.propTypes = {
  introduceStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 400
  }),
})(inject('introduceStore', 'uiStore')(observer(Assort)));
