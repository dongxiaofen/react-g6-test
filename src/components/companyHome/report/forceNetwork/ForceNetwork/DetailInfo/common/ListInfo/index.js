import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
// import * as svgTools from 'helpers/svgTools';
import styles from './index.less';

function ListInfo({listData, forceNetworkStore}) {
  const tabAct = forceNetworkStore.nodeInfo.tabAct;
  const changeTab = (idx) => {
    forceNetworkStore.updateValue('nodeInfo.tabAct', idx);
  };
  const createTabs = ()=> {
    const output = [];
    listData.tabs.map((tabItem, idx)=>{
      const cssName = tabAct === idx ? styles.tabActive : styles.tab;
      output.push(<p key={`tab${idx}`} className={cssName} onClick={changeTab.bind(null, idx)}>{tabItem}</p>);
    });
    return output;
  };
  const modifyValue = (itemData, keyCig)=> {
    let value = itemData[keyCig.key];
    if (!value) {
      value = '--';
    } else if (keyCig.keyType === 'ratio') {
      value = (value * 100).toFixed(2) + '%';
    } else if (keyCig.keyType === 'money') {
      value = value + itemData.regCapCur;
    }
    return value;
  };
  const createContent = () => {
    const content = listData.content[tabAct];
    const output = [];
    if (!content.data) {
      return <p className={styles.noMess}>暂无信息</p>;
    }
    content.data.map((itemData, index)=> {
      const rowItem = [];
      if (content.type === 'inline') {
        content.keys.map((keyCig, idx)=>{
          rowItem.push(<p key={`info${idx}`} className={styles.value}>{modifyValue(itemData, keyCig)}</p>);
        });
      } else {
        content.keys.map((keyCig, idx)=>{
          rowItem.push(<p key={`info${idx}`} className={styles.value1}>{keyCig.label}：{modifyValue(itemData, keyCig)}</p>);
        });
      }
      output.push(
        <div key={`row${index}`} className={`${styles.row} clearfix`}>
          <p className={content.type === 'inline' ? styles.name : styles.blockName} title={itemData.name}>{itemData.name}</p>
          {rowItem}
        </div>
      );
    });
    return output;
  };
  return (
    <div>
      <div className="clearfix">
        {createTabs()}
      </div>
      <div className={styles.line}></div>
      <div className={styles.content}>
        {createContent()}
      </div>
    </div>
  );
}

ListInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(ListInfo));
