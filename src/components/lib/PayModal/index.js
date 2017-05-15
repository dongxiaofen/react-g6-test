import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Modal from 'components/lib/Modal';

function PayModal({
  clientStore,
  confirmAction,
  btnLoading,
  closeAction,
  pointText,
  pactUrl,
  pactName,
  visible,
  tittle,
  modalType,
  width,
  choiceClick,
  selectValue,
}) {
  // 生成报告或转为监控
  const payClick = () => {
    if (confirmAction) {
      confirmAction();
    }
  };
  // 关闭弹窗
  const closeModal = () => {
    if (closeAction) {
      closeAction();
    }
  };
  // 选择持续监控时间
  const selectClick = (value) => {
    choiceClick(value);
  };

  const modalBtnList = () => {
    const init = [
      {text: '1个月', key: 'ONE_MONTH'},
      {text: '2个月', key: 'TWO_MONTH'},
      {text: '3个月', key: 'THREE_MONTH'},
      {text: '4个月', key: 'FOUR_MONTH'},
      {text: '5个月', key: 'FIVE_MONTH'},
      {text: '6个月', key: 'SIX_MONTH'},
      {text: '7个月', key: 'SEVEN_MONTH'},
      {text: '8个月', key: 'EIGHT_MONTH'},
      {text: '9个月', key: 'NINE_MONTH'},
      {text: '10个月=1年', key: 'ONE_YEAR'},
    ];
    return init.map((item, key) => {
      return (
        <div
          key={`payModalSelectKey${key}`}
          className={styles.selectItem}>
          <div
            className={selectValue === item.key ? styles.active : styles.selectDiv}
            onClick={selectClick.bind(null, item.key)}>
            {item.text}
          </div>
        </div>
      );
    });
  };

  const modalConfig = {
    title: tittle,
    width: width,
    visible: visible,
    isNeedBtn: true,
    confirmText: '确定',
    cancelText: '取消',
    closeAction: closeModal,
    cancelAction: closeModal,
    confirmAction: payClick,
    confirmLoading: btnLoading,
    pointText: pointText,
    pactUrl: pactUrl,
    pactName: pactName,
  };

  // modal内容
  let modalContent = '';
  // 监控模块
  if (modalType === 'createMonitor'
      || modalType === 'turnMonitor'
      || modalType === 'continueMonitor') {
    modalContent = modalBtnList();
  }
  console.log(clientStore.userInfo.consumeType, '-------clientStoreclientStoreclientStore');
  return (
    <div>
      <Modal {...modalConfig}>
        <div className={`clearfix ${styles.wrap}`}>
          {modalContent}
        </div>
      </Modal>
    </div>
  );
}

PayModal.propTypes = {
  clientStore: PropTypes.object,
  closeAction: PropTypes.func,
  confirmAction: PropTypes.func,
  btnLoading: PropTypes.bool,
  pointText: PropTypes.string,
  selectValue: PropTypes.string,
  pactUrl: PropTypes.string,
  pactName: PropTypes.string,
  visible: PropTypes.bool,
  tittle: PropTypes.string,
  modalType: PropTypes.string,
  width: PropTypes.string,
  choiceClick: PropTypes.func,
};
export default inject('clientStore')(observer(PayModal));
