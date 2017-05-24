import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FreeButton({modalStore, payModalStore, itemData, singleData, createMonitor, createReportType, selectReportType}) {
  const reportOpen = () => {
    selectReportType('report');
    const args = {
      title: '创建报告',
      width: '504px',
      isSingleBtn: true,
      pointText: '升级报告即视为同意',
      confirmAction: createReportType,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./CreateReport'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
    singleData(itemData);
  };
  const choiceOk = () => {
    const obj = {companyName: itemData.company, time: payModalStore.selectValue};
    createMonitor(obj);
  };
  const monitorOpen = () => {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'width': '580px',
      'pointText': '加入监控即视为同意',
      'callBack': choiceOk,
    });
  };
  return (
    <div className={`${styles.wrap}`}>
      <div
        onClick={reportOpen}
        className={`${styles.addReport}`}>创建报告</div>
      <div
        onClick={monitorOpen}
        className={`${styles.addMonitor}`}>加入监控</div>
    </div>
  );
}

FreeButton.propTypes = {
  itemData: PropTypes.object,
  modalStore: PropTypes.object,
  payModalStore: PropTypes.object,
  singleData: PropTypes.func,
  createMonitor: PropTypes.func,
  createReportType: PropTypes.func,
  selectReportType: PropTypes.func,
};
export default observer(FreeButton);
