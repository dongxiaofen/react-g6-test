import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import * as svgTools from 'helpers/svgTools';
// import styles from './index.less';

function Operation({forceNetworkStore, routing}) {
  const getShortPath = ()=>{
    if (forceNetworkStore.focalNode) {
      const {monitorId} = routing.location.query;
      const source = forceNetworkStore.centerNode.id;
      const target = forceNetworkStore.focalNode.id;
      const currentNetwork = svgTools.getCurrentNodesLinks(forceNetworkStore.forceNetwork);
      forceNetworkStore.getShortPath(monitorId, {source, target, currentNetwork});
    }
  };
  return (
    <div>
      <a onClick={getShortPath}>最短路径</a>
    </div>
  );
}

Operation.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(Operation));
