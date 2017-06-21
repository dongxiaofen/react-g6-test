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
          changeTrendData={msStore.changeTrendData}
          setChangeTable={msStore.setChangeTable} />
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
  mapDataToProps: props => {
    const msStore = props.msStore;
    const changeTrendData = msStore.changeTrendData;
    const isErr = changeTrendData.companyData.length === 0 && changeTrendData.eventData.length === 0;
    return {
      loading: msStore.loadingGroup.changeTrend,
      category: 0,
      height: 363,
      error: isErr,
      errCategory: 1,
    };
  }
})(observer(ChangeTrendBody));
