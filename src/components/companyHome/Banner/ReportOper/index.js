import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Button from 'components/lib/button';

function ReportOper({ companyHomeStore, routing, bannerStore }) {
  const companyName = routing.location.query.companyName;
  const collection = bannerStore.bannerInfoData.collection;
  const createCollecIcon = () => {
    if (bannerStore.collectionLoading) {
      return 'anticon anticon-spin anticon-loading';
    } else if (collection) {
      return 'fa fa-star';
    }
    return 'fa fa-star-o';
  };
  return (
    <div>
      {
        companyHomeStore.reportInfo.reportId === '' ?
          <Button btnType="primary"
                  className={styles.btn}
                  onClick={companyHomeStore.openUpReportModal}>升级报告</Button>
          : ''
      }
      {
        companyHomeStore.reportInfo.dimensions.length < 1 ?
          <Button
            btnType="primary"
            className={styles.btnLoan}
            onClick={companyHomeStore.openLoanModal}>创建分析</Button>
          : ''
      }
      {
        companyHomeStore.reportInfo.monitorId === '' ?
          <Button
            btnType="primary"
            className={styles.btnLoan}
            onClick={companyHomeStore.createMonitor.bind(null, companyName)}>
            加入监控
          </Button>
          : ''
      }
      <Button
        className={styles.btnColec}
        onClick={bannerStore.addOrCancelCollection.bind(null, { companyName, collection: !collection })}>
        <i className={`${createCollecIcon()} ${styles.collection}`} aria-hidden="true"></i>
        {collection ? '取消收藏' : '加入收藏'}
      </Button>
    </div>
  );
}

ReportOper.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore', 'routing', 'bannerStore')(observer(ReportOper));
