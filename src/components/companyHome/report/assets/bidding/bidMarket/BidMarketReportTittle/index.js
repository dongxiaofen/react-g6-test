import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function BidMarketReportTittle({assetsStore}) {
  const { titleData } = assetsStore;
  return (
    <div className={styles['report-block']}>
      <div className={styles['report-block-item']}>
        <span className={styles['report-block-key']}>招投标标题：</span>
        <span className={styles['report-block-value']}>
            {titleData.title ? titleData.title : ''}
          </span>
      </div>
      <div className={styles['report-block-item']}>
        <span className={styles['report-block-key']}>公告日期：</span>
        <span className={styles['report-block-value']}>{titleData.publishedDateTime ? titleData.publishedDateTime : '无'}</span>
      </div>
      <div className={styles['report-block-item']}>
        <span className={styles['report-block-key']}>公告类型：</span>
        <span className={styles['report-block-value']}>{titleData.announceType ? titleData.announceType : '无'}</span>
      </div>
      <div className={`${styles['report-block-item']} ${styles['report-block-bid']}`}>
        <span className={styles['report-block-key']}>投标方：</span>
        <span className={styles['report-block-value']}>
            {titleData.participator ? titleData.participator : '无'}
          </span>
      </div>
    </div>
  );
}

BidMarketReportTittle.propTypes = {
  assetsStore: PropTypes.object,
};
export default inject('assetsStore')(observer(BidMarketReportTittle));
