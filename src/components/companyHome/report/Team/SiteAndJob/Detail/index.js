import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Detail({ siteAndJob }) {
  const detail = siteAndJob.detail;
  const location = detail.location;
  const category = detail.category;
  const year = Number(siteAndJob.year);
  const month = Number(siteAndJob.month);
  const latestYear = Number(siteAndJob.latestYear);
  const latestMonth = Number(siteAndJob.latestMonth);
  return (
    <div className={styles['addJob-box1-block']}>
      <div className={`clearfix ${styles['addJob-detail-title']}`}>
        <span className={styles['addJob-detail-txt']}>新增详情：</span>
        <div className={`clearfix ${styles['addJob-detail-prompt']}`}>
          <div className={`clearfix ${styles['addJob-detail-round']}`}>
            <div className={styles['title-round1']}></div>
            <div className={styles['title-txt']}>地点</div>
          </div>
          <div className={`clearfix ${styles['addJob-detail-round']}`}>
            <div className={styles['title-round2']}></div>
            <div className={styles['title-txt']}>岗位</div>
          </div>
        </div>
      </div>
      <div className={`clearfix ${styles['addJob-detail-content']}`}>
        <div className={styles['detail-content-title']}>
          <div className={styles['content-title-date']}>{year + '.' + month}</div>
          {
            latestYear === year && latestMonth === month
              ?
              <div className={styles['content-title-txt']}>最新</div>
              :
              ''
          }
        </div>
        <div className={styles['content-block']}>
          {
            location.length > 0
              ?
              <div className={styles['content-block-address']}>
                <div className={`clearfix`}>
                  <div className={styles['title-round1']}></div>
                  <div className={styles['address-txt']}>地点</div>
                </div>
                <div className={styles['block-address-text1']}>
                  <span>{location.join('；')}</span>
                </div>
              </div>
              :
              ''
          }
          {
            category.length > 0
              ?
              <div className={styles['content-block-job']}>
                <div className={`clearfix`}>
                  <div className={styles['title-round2']}></div>
                  <div className={styles['address-txt']}>岗位</div>
                </div>
                <div className={styles['block-address-text2']}>
                  <span>{category.join('；')}</span>
                </div>
              </div>
              :
              ''
          }
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  siteAndJob: PropTypes.object,
};
export default observer(Detail);
