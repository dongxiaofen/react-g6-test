import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';


function TableBody({ hasScore, dateType, data, hasFlag, routing }) {
  const showRigthDate = (latestDt, alertCount, score) => {
    if (dateType === 'singeLine') {
      return (<div className={styles.date}>2017-08-01</div>);
    }else if (dateType === 'comprehensive' || dateType === 'warning') {
      return (
        <div className={`${styles.has_warning_counts} ${dateType === 'comprehensive' ? styles.comprehensive : styles.warning_count}`}>
          <div className={styles.discript}>
            <span className={styles.count_text}>{dateType === 'comprehensive' ? '综合分' : '预警次数'}</span>
            <span className={styles.count}>{dateType === 'comprehensive' ? score : alertCount}</span>
          </div>
          <div className={styles.date_time}>{latestDt}</div>
        </div>
      );
    }
  };
  const jumpPage = (companyName) => {
    routing.push(`/searchCompany?companyName=${companyName}`);
  };
  const createList = () => {
    let listItem = [];
    data.map((itemData, index) => {
      listItem = [...listItem,
        <div key={`${index}list_items`} className={`clearfix ${styles.singe_item}`}>
          <div className="pull-left">
            <div className={styles.right_discription}>
              <a onClick={jumpPage.bind(this, itemData.companyName)} className={styles.companyName}>{itemData.companyName}</a>
              { hasFlag && itemData.productType === 'MONITOR' ? <span className={`${styles.flag} ${styles.monitor}`}>监控</span> : ''}
              { hasFlag && itemData.productType === ' ANALYSIS' ? <span className={`${styles.flag} ${styles.monitor}`}>深度</span> : ''}
              { hasScore ? <span className={styles.score}>{itemData.score}分</span> : '' }
              <div className={styles.account_user}>
                {`所属帐号：${itemData.userName}(${itemData.email})`}
              </div>
            </div>
          </div>
          <div className={`pull-right ${styles.warning_date}`}>
            { showRigthDate(itemData.latestDt, itemData.alertCount, itemData.score) }
          </div>
        </div>
      ];
    });
    return listItem;
  };

  return (
    <div className={styles.body_box}>
      {createList()}
    </div>
  );
}

TableBody.propTypes = {
  className: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(inject('routing')(observer(TableBody)));
