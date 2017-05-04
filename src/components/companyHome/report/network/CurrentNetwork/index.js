import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';
import {Row, Col} from 'components/common/layout';
import CircleNetworkGraph from './CircleNetworkGraph';
import ForceNetworkGraph from './ForceNetworkGraph';
import LegendBar from './LegendBar';
import NodePanel from './NodePanel';
import CircleTypeList from './CircleTypeList';

function CurrentNetwork({layout, swithLayout}) {
  const svgWidth = document.getElementById('reportContainer').offsetWidth * 3 / 5 - 15;
  const svgHeight = window.screen.height - 280;
  return (
    <Row>
      <Col width="9">
        <LegendBar swithLayout={swithLayout} />
        <NodePanel />
        {
          layout === 'circle' ?
          <CircleNetworkGraph {...{svgWidth, svgHeight}} /> : <ForceNetworkGraph {...{svgWidth, svgHeight}} />
        }
      </Col>
      <Col width="3">
        <CircleTypeList />
      </Col>
    </Row>
  );
}

CurrentNetwork.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    // errCategory: 1,
    // module: '关联图'
  })
})(observer(CurrentNetwork));
