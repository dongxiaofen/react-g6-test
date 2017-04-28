import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';
import {Row, Col} from 'components/common/layout';
import NetworkGraph from './NetworkGraph';

function CurrentNetwork(props) {
  console.log('net', props);
  return (
    <Row>
      <Col width="9">
        <NetworkGraph />
      </Col>
      <Col width="3">
        {/* <TypeList {...this.props} /> */}
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
    errCategory: 1,
    module: '关联图'
  })
})(observer(CurrentNetwork));
