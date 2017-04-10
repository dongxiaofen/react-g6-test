import React from 'react';
import styles from './index.less';
function TypeFilter() {
  const filterConfig = [
    {name: '全部监控', status: ''},
    {name: '监控中', status: 'MONITOR'},
    {name: '即将到期', status: 'ABOUT_TO_EXPIRE'},
    {name: '暂停监控', status: 'PAUSE'},
    {name: '监控到期', status: 'EXPIRED'},
  ];
  const changeFilter = (status) => {
    console.log(status);
  };
  const createFilter = () => {
    const output = [];
    filterConfig.forEach(item => {
      const monitorStatus = '';
      const cssName = monitorStatus === item.status ? styles.activeFilterItem : styles.filterItem;
      output.push(
        <div key={item.name} className={cssName} onClick={changeFilter.bind(this, item.status)}>
          {item.name}
        </div>
      );
    });
    return output;
  };
  return (
    <div className={styles.wrapper}>
      {createFilter()}
    </div>
  );
}

export default TypeFilter;
