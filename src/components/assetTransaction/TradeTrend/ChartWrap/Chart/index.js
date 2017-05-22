import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function Chart({ subTitle, data, chartId, option, message }) {
  const modifyValue = (value) => {
    let _cssName = styles.zero;
    if (value !== 0) {
      _cssName = value > 0 ? styles.up : styles.down;
    }
    return <span className={_cssName}>{`${(value * 100).toFixed(2)}%`}</span>;
  };
  return (
    <div>
      <div className="clearfix">
        <div className={styles.fl}>
          <h3 className={styles.subTitle}>
            <i className={styles.moneyIcon}></i>
            {subTitle[0]}
          </h3>
          <div>
            <span className={styles.label}>同比</span>
            {modifyValue(data[0])}
          </div>
          <div>
            <span className={styles.label}>环比</span>
            {modifyValue(data[1])}
          </div>
        </div>
        <div className={styles.fl}>
          <h3 className={styles.subTitle}>
            <i className={styles.countIcon}></i>
            {subTitle[1]}
          </h3>
          <div>
            <span className={styles.label}>同比</span>
            {modifyValue(data[2])}
          </div>
          <div>
            <span className={styles.label}>环比</span>
            {modifyValue(data[3])}
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <BaseChart
          height="400px"
          chartId={chartId}
          option={option} />
      </div>
      <div className={styles.message}>
        <i className={`fa fa-exclamation-circle ${styles.icon}`} aria-hidden="true"></i>
        {message}
      </div>
    </div>
  );
}

Chart.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.array,
  data: PropTypes.array,
  chartId: PropTypes.string,
  option: PropTypes.object,
  message: PropTypes.string,
  tradeTrendLoading: PropTypes.bool,
  chartData: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.tradeTrendLoading,
    category: 0,
    height: 476,
    error: props.chartData && props.chartData.length === 0,
    errCategory: 1,
  })
})(observer(Chart));
