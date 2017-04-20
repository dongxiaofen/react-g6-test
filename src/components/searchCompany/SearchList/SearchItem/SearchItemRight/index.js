import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import FreeButton from './FreeButton';
import ReportButton from './ReportButton';

function SearchItemRight({itemData, modalStore, payModalStore, singleData, createMonitor}) {
  let output = '';
  if (itemData.monitorStatus !== 'MONITOR' && itemData.monitorStatus !== 'PAUSE' && itemData.monitorStatus !== 'EXPIRED' && itemData.reportStatus !== 'REPORT') {
    output = (
      <FreeButton
        payModalStore={payModalStore}
        modalStore={modalStore}
        itemData={itemData}
        singleData={singleData}
        createMonitor={createMonitor} />
    );
  }
  if (itemData.reportStatus === 'REPORT' || itemData.monitorStatus === 'MONITOR') {
    output = (
      <ReportButton itemData={itemData} />
    );
  }
  return (
    <div className={`${styles.itemRightWrap}`}>
      {output}
    </div>
  );
}

SearchItemRight.propTypes = {
  itemData: PropTypes.object,
  modalStore: PropTypes.object,
  payModalStore: PropTypes.object,
  singleData: PropTypes.func,
  createMonitor: PropTypes.func,
};
export default observer(SearchItemRight);
