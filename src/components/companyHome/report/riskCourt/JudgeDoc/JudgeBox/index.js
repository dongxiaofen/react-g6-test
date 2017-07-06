import React from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import JudeCard from './JudgeCard';
import Pager from 'components/common/Pager';

function JudgeBox({data, uiStore}) {
  const module = data.module;
  const showParams = uiStore.uiState[module];
  const page = showParams.index;
  const createTable = ()=>{
    const output = [];
    let rowIdx = 0;
    data.items.map((dataAarry, index) => {
      const itemCard = [];
      dataAarry.map((obj, idx) => {
        itemCard.push(
          <div className={styles.rowItem} key={`card${index}${idx}`}>
            <JudeCard
              key={`${index}${idx}`}
              itemData={obj}
              rowIdx= {`${page}-${rowIdx}`}
              module={module}
              data={data}
              showParams={showParams}
              uiStore={uiStore}/>
          </div>
        );
        rowIdx ++;
      });
      output.push(
        <div className={styles.cardWrap} key={`card${index}`}>
          <div className={styles.relLine}></div>
          {
            itemCard.length < 2 ? '' : <i className={styles.icon}></i>
          }
          {itemCard[0]}
          <div className={styles.relation}>
            {itemCard.slice(1)}
          </div>
        </div>
      );
    });
    return output;
  };
  return (
    <div className={`clearfix ${styles.box}`}>
      {createTable()}
      <Pager module={module} type="small" tData={data.items}/>
    </div>
  );
}
export default inject('uiStore')(observer(JudgeBox));