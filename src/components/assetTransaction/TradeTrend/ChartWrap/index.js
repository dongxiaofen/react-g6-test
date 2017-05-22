import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import Chart from './Chart';

function ChartWrap({
  title,
  subTitle,
  chartId,
  option,
  message,
  tradeTrendLoading,
  data,
  chartData,
}) {
  return (
    <div className={styles.chartWrap}>
      <h2 className={styles.title}>{title}</h2>
      <Chart
        subTitle={subTitle}
        chartId={chartId}
        option={option}
        message={message}
        tradeTrendLoading={tradeTrendLoading}
        data={data}
        chartData={chartData} />
    </div>
  );
}

ChartWrap.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.array,
  data: PropTypes.array,
  chartId: PropTypes.string,
  option: PropTypes.object,
  message: PropTypes.string,
  tradeTrendLoading: PropTypes.bool,
  chartData: PropTypes.object,
};
export default observer(ChartWrap);
