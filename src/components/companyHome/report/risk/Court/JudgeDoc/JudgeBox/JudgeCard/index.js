import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import config from 'dict/reportModule';
function JudgeCard({itemData, rowIdx, data, showParams, uiStore, module}) {
  const show = showParams.show.get(rowIdx);
  const createItem = ()=>{
    const output = [];
    const dict = data.dict;
    const keyConfig = show ? data.viewConfig : data.hideConfig;
    let blockCss;
    let value = '';
    keyConfig.map((obj, idx) => {
      blockCss = obj.highLight ? styles.lightBlock : styles.paddingBlock;
      value = obj.handle ? obj.handle(itemData[obj.key]) : itemData[obj.key];
      if (!value || value === '') {
        value = '无';
      }
      output.push(
        <div className={styles.col} key={idx} style={{width: obj.width / 12 * 100 + '%'}}>
          <span className={blockCss}>
            <span className={styles.key}>{config[dict][obj.key]} : </span>
            <span className={styles.value}>{value}</span>
          </span>
        </div>
      );
    });
    return output;
  };
  const viewDetail = () => {
    uiStore.toggleShowValue(module, rowIdx);
  };
  const iconStr = show ? 'up' : 'down';
  const label = itemData.judgeProcess === '' ? itemData.caseType : `${itemData.caseType} ${itemData.judgeProcess.substring(0, 2)}`;
  return (
    <div className={`${styles.labelRow} clearfix`}>
      <div className={styles.label}>
        <span title={itemData.label}>{label}</span>
      </div>
      <div className={`${styles.rowContent} clearfix`}>
        {createItem()}
      </div>
      <span onClick={viewDetail} className={styles.viewBtn}>
        <i className={'fa fa-angle-' + iconStr}></i>
        {show ? '收起' : '查看详情'}&nbsp;
      </span>
    </div>
  );
}
export default observer(JudgeCard);
