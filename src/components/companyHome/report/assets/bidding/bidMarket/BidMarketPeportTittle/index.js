import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function BidMarketPeportTittle({}) {
  return (
    <div className={styles['report-block']}>
      <div className={styles['report-block-item']}>
        <span className={styles['report-block-key']}>招投标标题：</span>
        <span className={styles['report-block-value']}>
            {titleData.get('title') ? titleData.get('title') : ''}
          </span>
      </div>
      <div className={styles['report-block-item']}>
        <span className={styles['report-block-key']}>公告日期：</span>
        <span className={styles['report-block-value']}>{titleData.get('publishDate') ? titleData.get('publishDate') : '无'}</span>
      </div>
      <div className={styles['report-block-item']}>
        <span className={styles['report-block-key']}>公告类型：</span>
        <span className={styles['report-block-value']}>{titleData.get('type') ? titleData.get('type') : '无'}</span>
      </div>
      <div className={`${styles['report-block-item']} ${styles['report-block-bid']}`}>
        <span className={styles['report-block-key']}>投标方：</span>
        <span className={styles['report-block-value']}>
            {titleData.get('participator') ? titleData.get('participator') : '无'}
          </span>
      </div>
    </div>
  );
}

BidMarketPeportTittle.propTypes = {
  foo: PropTypes.string,
};
export default observer(BidMarketPeportTittle);
