import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Col from 'components/common/layout/Col';
import styles from './index.less';

import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';

function numData(loading, num) {
  return loading ? <AnimateLoading animateCategory={1} /> : num;
}

function StatisticInfoItem({ data, loading }) {
  return (
    <Col width="3">
      <div className={styles.statisticItem}>
        <div className={styles['trend-item-title']}>{data.title}</div>
        <div className={`clearfix ${ loading ? styles['trend-item-sum-loading'] : styles['trend-item-sum'] }`}>
          <div className={styles['trend-sum-num']}>{numData(loading, data.num)}</div>
          <div className={styles['trend-sum-num-sub']}>
            <div className={styles['trend-num-sub-item']}>
              {data.numTitle}
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`clearfix ${styles['trend-item-content1']}`}>
            <div>{data.subtitle1}</div>
            <div>{data.subtitle2}</div>
          </div>
          <div className={`clearfix ${styles['trend-item-content2']}`}>
            <div
              className={styles.subContent1}
              title={data.subContent1}>
              {data.subContent1}
            </div>
            <div>{data.subContent2}</div>
          </div>
        </div>
      </div>
    </Col>
  );
}

StatisticInfoItem.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};
export default observer(StatisticInfoItem);
