import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Popover from 'antd/lib/popover';


function TableBody({dateType, data, hasFlag, routing, searchCompanyStore, owner }) {
  // const showRigthDate = (latestDt, alertCount, score) => {
  //   if (dateType === 'singeLine') {
  //     return (<div className={styles.date}>{latestDt}</div>);
  //   }else if (dateType === 'comprehensive' || dateType === 'warning') {
  //     return (
  //       <div className={`${styles.has_warning_counts} ${dateType === 'comprehensive' ? styles.comprehensive : styles.warning_count}`}>
  //         <div className={styles.discript}>
  //                 <span className={styles.count_text}>{dateType === 'comprehensive' ? '综合分' : '预警次数'}</span>
  //                 <span className={styles.count}>{dateType === 'comprehensive' ? score : alertCount}</span>
  //         </div>
  //         <div className={styles.date_time}>{latestDt}</div>
  //       </div>
  //     );
  //   } else if (dateType === 'warningDate') {
  //     return (
  //     <span className={`${styles.has_warning_counts} ${styles.warning_date} ${styles.discript}`}>
  //       <span className={styles.count_text}>预警时间</span>
  //       <span className={styles.date_time_w}>{latestDt}</span>
  //     </span>
  //     );
  //   }
  //   return (
  //     <span className={`${styles.has_warning_counts} ${styles.warning_date} ${styles.discript}`}>
  //       <span className={styles.count_text}>预警时间</span>
  //       <span className={styles.date_time_w}>{latestDt}</span>
  //     </span>
  //   );
  // };
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
            <div className={`${styles.right_discription}`}>
              {dateType === 'warningDate' && index === 0 ? <span className={styles.rank_lable_red}>NEW</span> : <span className={index === 0 ? styles.rank_lable_index1 : styles.rank_lable}>{index + 1}</span>}
              <a onClick={jumpPage.bind(this, itemData.companyName, itemData.productId)} className={styles.companyName}>{spliceCompanyName(itemData.companyName)}</a>
              { hasFlag && itemData.productType === 'MONITOR' ? <span className={`${styles.flag} ${styles.monitor}`}>监控</span> : ''}
              { hasFlag && itemData.productType === 'DEEP_MONITOR' ? <span className={`${styles.flag} ${styles.monitor}`}>深度</span> : ''}
            </div>
            <div className={`${styles.warning_date}`}>
              {
                owner !== 'own' &&
                <span className={styles.account_user}>
                    <Popover content={`所属帐号：${itemData.userName}（${itemData.email}）`}>
                      {`所属帐号：${sliceString(itemData.userName.concat(itemData.email))}`}
                    </Popover>
                </span>
              }
              {
                <span className={`${styles.has_warning_counts} ${styles.warning_date} ${styles.discript}`}>
                  <span className={styles.count_text}>预警日期：</span>
                  <span className={styles.date_time_w}>{itemData.latestDt}</span>
                </span>
              }
            </div>
          {dateType === 'comprehensive' && <div className={index === 0 ? styles.text_label_first : styles.text_label}><span>{`综合分${itemData.score}`}</span></div>}
          {dateType === 'warning' && <div className={index === 0 ? styles.text_label_first : styles.text_label}><span>{`预警${itemData.alertCount}次`}</span></div>}
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
    errCategory: props.errCategory,
    error: props.error,
    module: props.module,
    errorWords: props.errorWords,
    path: props.path
  })
})(inject('routing', 'searchCompanyStore')(observer(TableBody)));
