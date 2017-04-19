import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FreeButton({modalStore, itemData, singleData}) {
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
    console.log(singleData, '====func');
    singleData(itemData);
  };
  return (
    <div className={`${styles.wrap}`}>
      <div
        onClick={reportOpen}
        className={`${styles.addReport}`}>查看报告</div>
      <div className={`${styles.addMonitor}`}>加入监控</div>
    </div>
  );
}

FreeButton.propTypes = {
  itemData: PropTypes.object,
  modalStore: PropTypes.object,
  singleData: PropTypes.func,
};
export default observer(FreeButton);
