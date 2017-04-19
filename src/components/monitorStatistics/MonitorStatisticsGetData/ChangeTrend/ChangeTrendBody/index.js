import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Row from 'components/common/layout/Row';
import Col from 'components/common/layout/Col';
import { loadingComp } from 'components/hoc';

import ChangeTrendChart from './ChangeTrendChart';
import ChangeTrendTable from './ChangeTrendTable';

function ChangeTrendBody({ msStore }) {
  const changeTrend = msStore.changeTrend;
  return (
    <Row>
      <Col width="9">
        <ChangeTrendChart
          chartOption={changeTrend.chartOption} />
      </Col>
      <Col width="3">
        <ChangeTrendTable mutual={changeTrend.mutual} />
      </Col>
    </Row>
  );
}

ChangeTrendBody.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.changeTrend,
    category: 0,
    error: !props.msStore.isEmptyObject('errorBody', 'changeTrend') || !props.msStore.changeTrend.result.length,
    errCategory: 1,
  })
})(observer(ChangeTrendBody));
