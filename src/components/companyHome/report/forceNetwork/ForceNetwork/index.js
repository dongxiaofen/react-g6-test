import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import {Row, Col} from 'components/common/layout';
import LegendBar from './LegendBar';
import ForceNetworkGraph from './ForceNetworkGraph';

function ForceNetwork({}) {
  const svgWidth = document.getElementById('reportContainer').offsetWidth - 15;
  const svgHeight = window.screen.height - 280;
  return (
    <Row>
      <Col width="12">
        <LegendBar />
        <ForceNetworkGraph {...{ svgWidth, svgHeight }} />
      </Col>
    </Row>
  );
}

ForceNetwork.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: '全网关联'
  })
})(observer(ForceNetwork));
