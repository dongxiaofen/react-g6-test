import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import * as svgTools from 'helpers/svgTools';
// import styles from './index.less';

function Operation({forceNetworkStore, routing}) {
  const getShortPath = ()=>{
    if (forceNetworkStore.focalNode) {
      const {monitorId} = routing.location.query;
      const {nodes, links} = forceNetworkStore.forceNetwork;
      const params = {};
      params.source = forceNetworkStore.centerNode.id;
      params.target = forceNetworkStore.focalNode.id;
      params.currentNetwork = svgTools.getNodesAndLinks(nodes, links);
      forceNetworkStore.getShortPath(monitorId, params);
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
