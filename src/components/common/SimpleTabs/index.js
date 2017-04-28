import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SimpleTabs({data, active, clickHandel}) {
  const createTabs = ()=> {
    const output = [];
    data.forEach((dataItem, idx)=>{
      const text = dataItem.label || dataItem.key;
      const disabled = dataItem.number === 0 ? true : false;
      let tabCss = styles.tabDis;
      if (!disabled) {
        tabCss = dataItem.key === active ? styles.tabActive : styles.tab;
      }
      output.push(
        <p className={styles.tabWrap} key={`tab${idx}`} onClick={disabled ? null : clickHandel.bind(null, dataItem.key)}>
          <span className={tabCss}>{dataItem.number || dataItem.number === 0 ? `${text}（${dataItem.number}）` : text}</span>
          <span className={styles.line}>|</span>
        </p>
      );
    });
    return output;
  };
  return (
    <div className="clearfix">
      {createTabs()}
    </div>
  );
}
export default observer(SimpleTabs);
