import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import FreeButton from './FreeButton';
import ReportButton from './ReportButton';

function SearchItemRight({itemData}) {
  let output = '';
  if (itemData.monitorStatus !== 'MONITOR' && itemData.monitorStatus !== 'PAUSE' && itemData.monitorStatus !== 'EXPIRED' && itemData.reportStatus !== 'REPORT') {
    output = (
      <FreeButton itemData={itemData} />
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
};
export default observer(SearchItemRight);
