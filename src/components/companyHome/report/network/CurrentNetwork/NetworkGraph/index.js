import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function NetworkGraph({}) {
  return (
    <div>
      NetworkGraph
    </div>
  );
}

NetworkGraph.propTypes = {
  foo: PropTypes.string,
};
export default observer(NetworkGraph);
