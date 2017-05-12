import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FreeButton({modalStore, payModalStore, itemData, singleData, createMonitor, createReportType, selectReportType}) {
  const reportOpen = () => {
    selectReportType('analysis');
    const args = {
      title: '选择报告类型',
      isSingleBtn: true,
      isNeedBtn: true,
      confirmLoading: false,
      width: 570,
      pointText: '选择报告即视为同意',
      pactUrl: 'xxxxxx',
      pactName: '用户服务协议',
      confirmAction: createReportType,
      confirmWidth: 320,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./ReportLoader'));
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
      'width': '560px',
      'pactName': '用户服务协议',
      'pactUrl': '/',
      'pointText': '加入监控即视为同意',
      'callBack': choiceOk
    });
  };
  return (
    <div className={`${styles.wrap}`}>
      <div
        onClick={reportOpen}
        className={`${styles.addReport}`}>查看报告</div>
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
