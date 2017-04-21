import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
// import { browserHistory } from 'react-router';

function FreeButton({modalStore, payModalStore, itemData, singleData, createMonitor}) {
  const reportOpen = () => {
    const args = {
      title: '选择报告类型',
      isNeedBtn: false,
      pointText: '创建报告即视为同意',
      pactUrl: 'xxxxxx',
      pactName: '用户服务协议',
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
      'pointText': '创建报告即视为同意',
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
};
export default observer(FreeButton);
