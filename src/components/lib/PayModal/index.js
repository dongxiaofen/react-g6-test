import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Modal from 'components/lib/Modal';

function PayModal({
  clientStore,
  visible,
  tittle,
  selectValue,
  confirmAction,
  closeAction,
  btnLoading,
  pointText,
  choiceClick,
  isSingleBtn,
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
      {text: '10个月', key: 'ONE_YEAR'},
    ];
    return init.map((item, key) => {
      return (
        <div
          key={`payModalSelectKey${key}`}
          className={styles.selectPoint}>
          <div
            className={selectValue === item.key ? styles.active : styles.selectDiv}
            onClick={selectClick.bind(null, item.key)}>
            {item.text}
            {item.key === 'ONE_YEAR' ? <i className={styles.lable}></i> : ''}
          </div>
        </div>
      );
    });
  };

  const modalPackage = () => {
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
      {text: '10个月', key: 'TEN_YEAR'},
      {text: '11个月', key: 'ELEVEN_YEAR'},
      {text: '1年', key: 'ONE_YEAR'},
    ];
    return init.map((item, key) => {
      return (
        <div
          key={`payModalKey${key}`}
          className={styles.selectPackge}>
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
    width: clientStore.userInfo.consumeType === 'FEESET' ? '580px' : '504px',
    visible: visible,
    isNeedBtn: true,
    confirmText: '确定',
    cancelText: '取消',
    closeAction: closeModal,
    cancelAction: closeModal,
    confirmAction: payClick,
    confirmLoading: btnLoading,
    pointText: pointText,
    isSingleBtn: isSingleBtn,
  };
  let modalContent = null;
  if (clientStore.userInfo.consumeType === 'FEESET') {
    modalContent = modalPackage();
  }else if (!clientStore.userInfo.consumeType || clientStore.userInfo.consumeType === 'POINT') {
    modalContent = modalBtnList();
  }
  return (
    <div>
      <Modal {...modalConfig}>
          <div className={`clearfix ${styles.wrap}`} style={{ marginBottom: 30 }}>
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
  visible: PropTypes.bool,
  isComboRenewal: PropTypes.bool,
  tittle: PropTypes.string,
  modalType: PropTypes.string,
  width: PropTypes.string,
  choiceClick: PropTypes.func,
  choiceMonitorType: PropTypes.func,
  isSingleBtn: PropTypes.bool,
  isRenewal: PropTypes.bool,
};
export default inject('clientStore')(observer(PayModal));
