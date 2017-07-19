import React from 'react';
import { observer, inject} from 'mobx-react';
import NodeIntro from '../NodeIntro';

function VerTab({blackListScanStore}) {
  const {nodeIntroVis} = blackListScanStore;
  const showNodeIntro = () => {
    blackListScanStore.setValue('nodeIntroVis', true);
  };
  const hideNodeIntro = () => {
    blackListScanStore.setValue('nodeIntroVis', false);
  };
  return (
    <div>
      <div style={{postion: 'relative'}}>
        <a onMouseEnter={showNodeIntro} onMouseLeave={hideNodeIntro}>节点说明</a>
        <NodeIntro visible={nodeIntroVis}/>
      </div>
    </div>
  );
}

export default inject('blackListScanStore')(observer(VerTab));
