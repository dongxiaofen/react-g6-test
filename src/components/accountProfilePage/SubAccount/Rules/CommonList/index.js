import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CommonList({data}) {
  const rulesType = {
    'RULE': '自定义预警',
    'SYS_RULE': '系统预警',
  };
  const createList = () => {
    let arrList = [];
    if (data) {
      data.map( (itemData, index) => {
        arrList = [...arrList,
          <li key={`${index}newAccount`} className={`${styles.list_item} clearfix`}>
            <div className={`${styles.user} pull-left`}>{`${rulesType[itemData.alertType]}：${itemData.ruleName}`}</div>
            <div className={`${styles.date} pull-right`}>
              { itemData.ruleTime ? <div>
                <p>最新预警日期</p>
                <p>{itemData.ruleTime}</p>
              </div> :
              <div>
                <p>预警次数</p>
                <p>{itemData.count}</p>
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
