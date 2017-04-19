import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import FreeButton from './FreeButton';
import ReportButton from './ReportButton';

function SearchItemRight({itemData, modalStore, singleData}) {
  let output = '';
  if (itemData.monitorStatus !== 'MONITOR' && itemData.monitorStatus !== 'PAUSE' && itemData.monitorStatus !== 'EXPIRED' && itemData.reportStatus !== 'REPORT') {
    output = (
      <FreeButton
        modalStore={modalStore}
        itemData={itemData}
        singleData={singleData} />
    );
  }
  if (itemData.reportStatus === 'REPORT') {
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
  singleData: PropTypes.func,
};
export default observer(SearchItemRight);
