import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import styles from './index.less';

function ChangeTrendTable({ mutual }) {
  const isAddSub = (val) => {
    const output = [];
    if (val > 0) {
      output.push(<li key={`li${val}`} className={styles.textRed}>+{val}</li>);
    } else if (val < 0) {
      output.push(<li key={`li${val}`} className={styles.textGreen}>{val}</li>);
    } else {
      output.push(<li key={`li${val}`}>{val}</li>);
    }
    return output;
  };

  const nowData = mutual.nowData;
  const beforeData = mutual.beforeData;

  return (
    <div className="clearfix">
      <div className={styles.tableTip}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.wdt1}></div>
          <div className={styles.tableText}>头条更新信息</div>
        </div>
        <div className={`clearfix`}>
          <div className={styles.wdt2}></div>
          <div className={styles.tableText}>头条更新企业</div>
        </div>
      </div>
      <div className={`clearfix ${styles['table-tip-content']}`}>
        <ul className={styles.tableItem}>
          <li></li>
          <li>头条信息</li>
          <li>信息变化量</li>
          <li>头条企业</li>
          <li>企业变化量</li>
        </ul>
        <ul className={styles.tableItem}>
          <li>{moment(beforeData.date).format('YYYY-MM-DD')}</li>
          <li>{beforeData.eventCount}</li>
          {isAddSub(beforeData.eventChange)}
          <li>{beforeData.companyCount}</li>
          {isAddSub(beforeData.companyChange)}
        </ul>
        <ul className={styles.tableItem}>
          <li>{moment(nowData.date).format('YYYY-MM-DD')}</li>
          <li>{nowData.eventCount}</li>
          {isAddSub(nowData.eventChange)}
          <li>{nowData.companyCount}</li>
          {isAddSub(nowData.companyChange)}
        </ul>
      </div>
    </div>
  );
}

ChangeTrendTable.propTypes = {
  mutual: PropTypes.object,
};
export default observer(ChangeTrendTable);
