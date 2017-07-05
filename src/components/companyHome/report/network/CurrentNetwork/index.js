import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';
import { Row, Col } from 'components/common/layout';
import CircleNetworkGraph from './CircleNetworkGraph';
import LegendBar from './LegendBar';
import NodePanel from './NodePanel';
import CircleTypeList from './CircleTypeList';
import styles from './index.less';

function CurrentNetwork({}) {
  const { resumeSvg, fullScreen, exitFull } = CircleNetworkGraph;
  console.log(document.body.clientWidth);
  const svgCol = document.body.clientWidth < 1611 ? 8 : 9;
  const legendCol = 12 - svgCol;
  const svgWidth = (document.getElementById('tabContentWrap').offsetWidth - 70) * svgCol / 12;
  const svgHeight = window.screen.height - 280;
  return (
    <div className={styles.box}>
      <Row>
        <Col width={`${svgCol}`}>
          <NodePanel exitFull={exitFull} />
          <CircleNetworkGraph {...{ svgWidth, svgHeight }} />
        </Col>
        <Col width={`${legendCol}`}>
          <LegendBar {...{ resumeSvg, fullScreen, exitFull }} />
          <CircleTypeList />
        </Col>
      </Row>
    </div>
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
