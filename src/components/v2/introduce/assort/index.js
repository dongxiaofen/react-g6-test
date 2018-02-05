import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
// import { Icon } from 'antd';
import { loadingComp } from 'components/hoc';
import all1 from 'imgs/interface/all_1.png';
import all2 from 'imgs/interface/all_2.png';
import business1 from 'imgs/interface/business_1.png';
import business2 from 'imgs/interface/business_2.png';
import manage1 from 'imgs/interface/manage_1.png';
import manage2 from 'imgs/interface/manage_2.png';
import person1 from 'imgs/interface/person_1.png';
import person2 from 'imgs/interface/person_2.png';
import risk1 from 'imgs/interface/risk_1.png';
import risk2 from 'imgs/interface/risk_2.png';

const Assort = ({ introduceStore, uiStore }) => {
  const getActiveImgIcon = (type) => {
    const config = {
      '所有服务': all1,
      '个人信息': person1,
      '工商信息': business1,
      '风险信息': risk1,
      '经营信息': manage1,
    };
    return config[type];
  };
  const getImgIcon = (type) => {
    const config = {
      '所有服务': all2,
      '个人信息': person2,
      '工商信息': business2,
      '风险信息': risk2,
      '经营信息': manage2,
    };
    return config[type];
  };
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
      if (introduceStore.filterInfo.classificationId === item.id) {
        output.push(
          <li key={idx} className={styles.active} onClick={handleFilter.bind(null, item.id)}>
          <span className={styles.imgBox}><img src={getImgIcon(item.name)} alt=""/></span> {item.name}</li>
        );
      } else {
        output.push(
          <li key={idx} onClick={handleFilter.bind(null, item.id)}>
          <span className={styles.imgBox}><img src={getActiveImgIcon(item.name)} alt=""/></span> {item.name}</li>
        );
      }
    });
    return output;
  };
  return (
    <ul className={styles.filters}>
      <li key="all" className={introduceStore.filterInfo.classificationId === '' ? styles.active : ''} onClick={handleFilter.bind(null, '')}>
      <span className={styles.imgBox}><img src={introduceStore.filterInfo.classificationId === '' ? getActiveImgIcon('所有服务') : getImgIcon('所有服务')} alt=""/></span> 所有服务</li>
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
