import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function TypeFilter({monitorListStore}) {
  const sortConfig = [
    {name: '首次监控', property: 'start_tm'},
    {name: '截止日期', property: 'expire_dt'},
    {name: '最近更新', property: 'latestTs'},
  ];
  const sortHandle = (property, sortType) => {
    monitorListStore.changeParams({
      sort: `${property},${sortType}`,
    });
  };
  const createSort = () => {
    const output = [];
    const reverseDict = {
      ASC: 'DESC',
      DESC: 'ASC'
    };
    const [properties, sort] = monitorListStore.searchParams.sort.split(',');
    let itemCss;
    let actStr;
    let directionStr;
    let iconCss;
    let sortType;
    sortConfig.forEach(item => {
      itemCss = properties === item.property ? styles.sortItemAct : styles.sortItem;
      actStr = sort === 'DESC' ? 'down' : 'up';
      directionStr = properties === item.property ? 'Act' : '';
      iconCss = styles[actStr + directionStr];
      sortType = properties === item.property ? reverseDict[sort] : sort;
      output.push(
        <div key={item.name} className={itemCss} onClick={sortHandle.bind(this, item.property, sortType)}>
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
