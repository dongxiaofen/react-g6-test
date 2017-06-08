import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CommonList({data}) {
  const rulesType = {
    'RULE': '自定义预警',
    'SYS_RULE': '系统预警',
    'BLACKLIST': '系统预警'
  };
  const createList = () => {
    let arrList = [];
    if (data) {
      data.map( (itemData, index) => {
        arrList = [...arrList,
          <li key={`${index}newAccount`} className={`${styles.list_item}`}>
            {index === 0 ? <span className={styles.rank_lable_blue}>NEW</span> : <span className={styles.rank_lable}>{index + 1}</span>}
            <span className={`${styles.user}`}>{`${rulesType[itemData.alertType]}：${itemData.ruleName}`}</span>
            <div className={`${styles.date}`}>
              { itemData.ruleTime ? <div>
                <span>预警日期：</span>
                <span>{itemData.ruleTime}</span>
              </div> :
              <div className={styles.w_count}>
                <span className={index === 0 ? styles.text_label_first : styles.text_label}>预警 {`${itemData.count}`} 次</span>
              </div>
              }
            </div>
          </li>
        ];
      });
      return arrList;
    }
  };
  return (
    <ul className={styles.item_box}>
      {createList()}
    </ul>
  );
}

CommonList.propTypes = {
  foo: PropTypes.object,
};
export default observer(CommonList);
