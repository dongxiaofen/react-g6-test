import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function TypeFilter({monitorListStore, uiStore}) {
  const sortConfig = [
    {name: '首次监控', property: 'start_tm'},
    {name: '截止日期', property: 'expire_dt'},
    {name: '最近更新', property: 'latestTs'},
  ];
  const sortDirection = monitorListStore.searchInfo.sortDirection;
  const properties = monitorListStore.searchInfo.params.sort.split(',')[0];
  const sortHandle = (property, newSortValue) => {
    monitorListStore.changeValue(`searchInfo.sortDirection.${property}`, newSortValue);
    monitorListStore.changeValue(`searchInfo.params.sort`, `${property},${newSortValue}`);
    uiStore.updateUiStore(`monitorListPager.index`, 1);
    monitorListStore.getMainList();
  };
  const createSort = () => {
    const output = [];
    const reverseDict = {
      ASC: 'DESC',
      DESC: 'ASC'
    };
    let itemCss;
    let actStr;
    let directionStr;
    let iconCss;
    let sortValue;
    let newSortValue;
    sortConfig.forEach(item => {
      sortValue = sortDirection[item.property];
      itemCss = properties === item.property ? styles.sortItemAct : styles.sortItem;
      actStr = sortValue === 'DESC' ? 'down' : 'up';
      directionStr = properties === item.property ? 'Act' : '';
      iconCss = styles[actStr + directionStr];
      newSortValue = properties === item.property ? reverseDict[sortValue] : sortValue;
      output.push(
        <div
          key={item.name}
          className={itemCss}
          onClick={sortHandle.bind(this, item.property, newSortValue)}
          >
          {item.name}
          <i className={iconCss}></i>
        </div>
      );
    });
    return output;
  };
  return (
    <div className={styles.wrapper}>
      {createSort()}
    </div>
  );
}

export default observer(TypeFilter);