import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import {Row, Col} from 'components/common/layout';
import LegendBar from './LegendBar';
import ForceNetworkGraph from './ForceNetworkGraph';
import DetailInfo from './DetailInfo';

function ForceNetwork({}) {
  const svgWidth = (document.getElementById('tabContentWrap').offsetWidth - 20) * 0.75;
  const svgHeight = window.screen.height - 280;
  const {handleZoom, resetNetWork} = ForceNetworkGraph;
  return (
    <Row>
      <Col width="9">
        <LegendBar />
        <ForceNetworkGraph {...{ svgWidth, svgHeight }} />
      </Col>
      <Col width="3">
        <DetailInfo handleZoom={handleZoom} resetNetWork={resetNetWork}/>
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
