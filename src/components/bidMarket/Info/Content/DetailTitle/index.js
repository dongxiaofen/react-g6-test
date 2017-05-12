import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function DetailTitle({ bidMarketStore }) {
  const isNotData = (data) => data ? data : '无';

  const titleData = bidMarketStore.detailTitleData;
  return (
    <div className={`clearfix ${styles.block}`}>
      <div className={styles.single}>
        <span className={styles['block-key']}>中标公告：</span>
        <span className={styles['block-value']}>{titleData.province ? titleData.province : ''}</span>
        <span>{titleData.city ? `-${titleData.city}` : ''}</span>
      </div>
      <div className={styles.single}>
        <span className={styles['block-key']}>项目名称：</span>
        <span className={styles['block-value']}>{isNotData(titleData.title)}</span>
      </div>
      <div className={styles.single}>
        <div className={styles.half}>
          <span className={styles['block-key']}>中标金额：</span>
          <span className={styles['block-value']}>
            {titleData.amount ? titleData.amount : ''}
            {titleData.unit ? titleData.unit : ''}
            {titleData.currency ? `（${titleData.currency}）` : ''}
          </span>
        </div>
        <div className={styles.half}>
          <span className={styles['block-key']}>中标单位：</span>
          <span className={styles['block-value']}>{isNotData(titleData.winningCompany)}</span>
        </div>
      </div>
      <div className={styles.single}>
        <div className={styles.half}>
          <span className={styles['block-key']}>中标单位身份：</span>
          <span className={styles['block-value']}>{isNotData(titleData.roleName)}</span>
        </div>
        <div className={styles.half}>
          <span className={styles['block-key']}>公告日期：</span>
          <span className={styles['block-value']}>{isNotData(titleData.publishedDate)}</span>
        </div>
      </div>
      <div className={styles.single}>
        <div className={styles.half}>
          <span className={styles['block-key']}>招标单位：</span>
          <span className={styles['block-value']}>{isNotData(titleData.purchaser)}</span>
        </div>
        <div className={styles.half}>
          <span className={styles['block-key']}>招标单位电话：</span>
          <span className={styles['block-value']}>{isNotData(titleData.purchaserContactPhone)}</span>
        </div>
      </div>
      <div className={styles.single}>
        <div className={styles.half}>
          <span className={styles['block-key']}>招标代理机构：</span>
          <span className={styles['block-value']}>{isNotData(titleData.agent)}</span>
        </div>
        <div className={styles.half}>
          <span className={styles['block-key']}>招标代理机构联系电话：</span>
          <span className={styles['block-value']}>{isNotData(titleData.agentContactPhone)}</span>
        </div>
      </div>
    </div>
  );
}

DetailTitle.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(DetailTitle));
