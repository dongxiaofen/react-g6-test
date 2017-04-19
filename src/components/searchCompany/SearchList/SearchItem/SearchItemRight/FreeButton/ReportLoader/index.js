import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { browserHistory } from 'react-router';

function ReportLoader({modalStore, searchCompanyStore, messageStore}) {
  // 设置loading
  // 调用/api/report
  const freeReport = () => {
    modalStore.closeAction();
    // message
    const obj = {
      content: '已查看免费报告'
    };
    messageStore.openMessage({ ...obj });
    const companyName = searchCompanyStore.singleItemData.company;
    browserHistory.push('/companyHome?companyName=' + companyName + '&companyType=FREE');
  };
  const createReport = () => {
    searchCompanyStore.createReport();
  };
  return (
    <div className={`${styles.box}`}>
      <div className={`${styles.boxCon} ${styles.boxConL}`}>
        <div onClick={freeReport} className={`${styles.boxBtn} ${styles.boxLeft}`}>
          <i></i>
          <span>查看快速报告</span>
        </div>
      </div>
      <div className={`${styles.boxCon}`}>
        <div onClick={createReport} className={`${styles.boxBtn} ${styles.boxRight}`}>
          <i></i>
          <span>创建高级报告</span>
        </div>
      </div>
    </div>
  );
}

ReportLoader.propTypes = {
  searchCompanyStore: PropTypes.object,
  modalStore: PropTypes.object,
};
export default inject('searchCompanyStore', 'modalStore', 'messageStore')(observer(ReportLoader));
