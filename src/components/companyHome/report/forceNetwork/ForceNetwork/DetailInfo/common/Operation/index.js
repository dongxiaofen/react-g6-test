import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import * as svgTools from 'helpers/svgTools';
import Button from 'components/lib/button';
import styles from './index.less';

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
    <div className={styles.operation}>
      <Button btnType="primary" className={styles.buttonEx}>节点扩展</Button>
      <Button onClick={getShortPath} btnType="primary" className={styles.button}>关联路径</Button>
    </div>
  );
}

Operation.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(Operation));
