import React from 'react';
import DICT from '../../../../config/Dict/reportModule';
import {Col} from 'components/common/layout';
import styles from './jobCard.less';
import {observer} from 'mobx-react';
function JobCard({data}) {
  const handleValue = (key, value)=>{
    if (key === 'salary' && Number(value) === 0) {
      return '面议';
    }
    return value;
  };
  const createItem = (origData, itemData) => {
    const output = [];
    origData.config.map((key)=>{
      if (itemData[key] !== '') {
        output.push(`${DICT[origData.dict][key]}（${handleValue(key, itemData[key])}）`);
      }
    });
    return <span className={styles.text}>{output.join('；')}</span>;
  };
  const createCard = (origData) => {
    const output = [];
    const firstKey = origData.firstKey;
    origData.items.map((itemData)=>{
      output.push(
        <Col width="4">
          <div className={styles.itemWrap}>
            <div className={styles.firstItem}>
              <a href={itemData.url} target="_blank">
                <span>{DICT[origData.dict][firstKey]}:</span>
                <span>{itemData[firstKey] ? itemData[firstKey] : '无'}</span>
              </a>
            </div>
            {createItem(origData, itemData)}
          </div>
        </Col>
      );
    });
    return output;
  };
  return (
    <div>
      <div className={styles.content}>
        {createCard(data)}
      </div>
    </div>
  );
}
export default observer(JobCard);
