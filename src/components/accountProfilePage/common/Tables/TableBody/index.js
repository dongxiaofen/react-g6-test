import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Popover from 'antd/lib/popover';


function TableBody({ hasScore, dateType, data, hasFlag, routing, searchCompanyStore, owner }) {
  const showRigthDate = (latestDt, alertCount, score) => {
    if (dateType === 'singeLine') {
      return (<div className={styles.date}>{latestDt}</div>);
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
    } else if (dateType === 'warningDate') {
      return (
      <div className={`${styles.has_warning_counts} ${styles.warning_date}`}>
        <div className={styles.discript}>
          <span className={styles.count_text}>预警时间</span>
        </div>
        <div className={styles.date_time_w}>{latestDt}</div>
      </div>
      );
    }
  };
  const sliceString = (str) => {
    if (str.length > 20) {
      return (`${str.slice(0, 19)}...`);
    }
    return str;
  };
  const jumpPage = (companyName, monitorId) => {
    if (owner && owner === 'own') {
      routing.push(`/companyHome/alertAnalysis?companyType=MAIN&monitorId=${monitorId}`);
    } else {
      searchCompanyStore.searchTabClick('COMPANY_NAME');
      searchCompanyStore.searchChange({target: {value: companyName}});
      searchCompanyStore.getCompanyList();
      routing.push(`/searchCompany`);
    }
  };
  const spliceCompanyName = (name) => {
    if (name.length > 14) {
      return (
        <Popover content={name}>
          {`${name.slice(0, 13)}...`}
        </Popover>
      );
    }
    return name;
  };
  const createList = () => {
    let listItem = [];
    data.map((itemData, index) => {
      listItem = [...listItem,
        <div key={`${index}list_items`} className={`clearfix ${styles.singe_item}`}>
          <div className="pull-left">
            <div className={`${styles.right_discription}`}>
              <a onClick={jumpPage.bind(this, itemData.companyName, itemData.productId)} className={styles.companyName}>{spliceCompanyName(itemData.companyName)}</a>
              { hasFlag && itemData.productType === 'MONITOR' ? <span className={`${styles.flag} ${styles.monitor}`}>监控</span> : ''}
              { hasFlag && itemData.productType === 'DEEP_MONITOR' ? <span className={`${styles.flag} ${styles.monitor}`}>深度</span> : ''}
              { hasScore ? <span className={styles.score}>{itemData.score}分</span> : '' }
              <div className={styles.account_user}>
                {owner && owner === 'own' ? '' : <Popover content={`所属帐号：${itemData.userName}（${itemData.email}）`}>
                  {`所属帐号：${sliceString(itemData.userName.concat(itemData.email))}`}
                </Popover>}
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
})(inject('routing', 'searchCompanyStore')(observer(TableBody)));
