import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import Row from 'components/common/layout/Row';
import Col from 'components/common/layout/Col';
import BaseChart from 'components/common/Charts/BaseChart';

function ChangeTrend({ changeTrend }) {
  console.log(changeTrend.result.length);
  return (
    <div className={styles.statisticItem}>
      <Row>
        <Col width="9">
          this is changeTrend
          {/*<BaseChart
            chartId="changeTrend"
            height="400px"
            option={ changeTrend.chartOption }/>*/}
        </Col>
        <Col width="3">
          this is changeTrend table
        </Col>
      </Row>
    </div>
  );
}

ChangeTrend.propTypes = {
  changeTrend: PropTypes.object,
};
export default observer(ChangeTrend);
