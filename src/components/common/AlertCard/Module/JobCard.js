import React from 'react';
import DICT from '../../../../dict/reportModule';
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
    origData.items.map((itemData, idx)=>{
      output.push(
        <Col key={idx} width="4" className={idx % 3 === 0 ? styles.clear : ''}>
          <div className={styles.itemWrap}>
            <div>
              {
                itemData.url ?
                <a href={itemData.url} target="_blank">
                  <span className={styles.firstItem}>{DICT[origData.dict][firstKey]}:{itemData[firstKey] ? itemData[firstKey] : '--'}</span>
                </a>
                :
                <p>
                  <span className={styles.firstItem}>{DICT[origData.dict][firstKey]}:{itemData[firstKey] ? itemData[firstKey] : '--'}</span>
                </p>
              }
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
