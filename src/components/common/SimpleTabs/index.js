import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SimpleTabs({data, active, clickHandel}) {
  const createTabs = ()=> {
    const output = [];
    data.forEach((dataItem, idx)=>{
      const text = dataItem.label || dataItem.key;
      const tabCss = dataItem.key === active ? styles.tabActive : styles.tab;
      output.push(
        <p className={tabCss} key={`tab${idx}`} onClick={clickHandel.bind(null, dataItem.key)}>
          {dataItem.number || dataItem.number === 0 ? `${text}(${dataItem.number})` : text}
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
