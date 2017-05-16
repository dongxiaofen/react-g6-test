import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NewAccountBody({data}) {
  const createList = () => {
    let arrList = [];
    if (data) {
      data.map( (itemData, index) => {
        arrList = [...arrList,
          <li key={`${index}newAccount`} className={`${styles.list_item} clearfix`}>
            <div className={`${styles.user} pull-left`}>{`所属账号：${itemData.userName}（${itemData.email}）`}</div>
            <div className={`${styles.date} pull-right`}>
              <p>最新预警日期</p>
              <p>{itemData.alertDt}</p>
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

NewAccountBody.propTypes = {
  data: PropTypes.object,
};
export default observer(NewAccountBody);
