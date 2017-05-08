import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import ForceNetworkGraph from './ForceNetworkGraph';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';
import {Row, Col} from 'components/common/layout';
import LegendBar from './LegendBar';
import DetailList from './DetailList';

function BlackNetwork({ }) {
  const svgWidth = document.getElementById('reportContainer').offsetWidth * 3 / 5 - 15;
  const svgHeight = window.screen.height - 280;
  return (
    <Row>
      <Col width="9">
        <LegendBar />
        <ForceNetworkGraph {...{ svgWidth, svgHeight }} />
      </Col>
      <Col width="3">
        <DetailList />
      </Col>
    </Row>
  );
}

BlackNetwork.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error
  })
})(observer(BlackNetwork));
