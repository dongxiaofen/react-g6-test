import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Link } from 'react-router';
import pathval from 'pathval';

function Statistic({ myHomePageStore }) {
  return (
    <div className={styles.statistic}>
      <h2 className={styles.mouldeTittle}>版块统计</h2>
      <div className={`clearfix ${styles['statistic-item']}`}>
        <Link to="/monitorList?type=MONITOR" className={`clearfix ${styles['statistic-left1']}` + ' ' + styles.icon1}>
          <div className={styles['statistic-icon']}>
          </div>
          <div className={styles['statistic-content']}>
              <span className={styles['statistic-content-text']}>
                监控企业
              </span>
            <span className={styles['statistic-content-num']}>{pathval.getPathValue(myHomePageStore, 'statistic.monitorCount')}</span>
          </div>
        </Link>
        <Link to="/monitorList?type=ABOUT_TO_EXPIRE" className={`clearfix ${styles['statistic-right1']}` + ' ' + styles.icon2}>
          <div className={styles['statistic-icon']}>
          </div>
          <div className={styles['statistic-content']}>
              <span className={styles['statistic-content-text']}>
                即将到期
              </span>
            <span className={styles['statistic-content-numRed']}>{pathval.getPathValue(myHomePageStore, 'statistic.expireIn7Days')}</span>
          </div>
        </Link>
      </div>
      <div className={`clearfix ${styles['statistic-item']}`}>
        <Link to="/riskHeadlines" className={`clearfix ${styles['statistic-left1']}` + ' ' + styles.icon3}>
          <div className={styles['statistic-icon']}>
          </div>
          <div className={styles['statistic-content']}>
              <span className={styles['statistic-content-text']}>
                每日企业
              </span>
            <span className={styles['statistic-content-num']}>
                {pathval.getPathValue(myHomePageStore, 'statistic.headlineCompanyCount')}</span>
          </div>
        </Link>
        <Link to="/riskHeadlines" className={`clearfix ${styles['statistic-right1']}` + ' ' + styles.icon4}>
          <div className={styles['statistic-icon']}>
          </div>
          <div className={styles['statistic-content']}>
              <span className={styles['statistic-content-text']}>
                每日信息
              </span>
            <span className={styles['statistic-content-num']}>
                {pathval.getPathValue(myHomePageStore, 'statistic.headlineEventCount')}
              </span>
          </div>
        </Link>
      </div>
      <div className={`clearfix ${styles['statistic-item-last']}`}>
        <Link to="/reportManage" className={`clearfix ${styles['statistic-left2']}` + ' ' + styles.icon5}>
          <div className={styles['statistic-icon']}>
          </div>
          <div className={styles['statistic-content']}>
              <span className={styles['statistic-content-text']}>
                报告数量
              </span>
            <span className={styles['statistic-content-num']}>
                {pathval.getPathValue(myHomePageStore, 'statistic.reportCount')}
              </span>
          </div>
        </Link>
        <Link to="/account" className={`clearfix ${styles['statistic-right2']} ${styles.icon6}`}>
          <div className={styles['statistic-icon']}>
          </div>
          <div className={styles['statistic-content']}>
              <span className={styles['statistic-content-text']}>
                子账号
              </span>
            <span className={styles['statistic-content-num']}>
                {pathval.getPathValue(myHomePageStore, 'statistic.subUserCount')}
              </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

Statistic.propTypes = {
  foo: PropTypes.string,
};
export default inject('myHomePageStore')(observer(Statistic));
