import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Modal from 'components/lib/Modal';

function PayModal({
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


  // modal内容
  let modalContent = '';
  // 监控模块
  if (modalType === 'createMonitor' || modalType === 'turnMonitor' || modalType === 'continueMonitor') {
    // console.log('进入监控模块');
    modalContent = (
      <div className={styles.wrap}>
        <div className={styles.select}>
          <div className={styles.selectWrap}>
            <div className={styles.selectRow}>
              <div onClick={selectClick.bind(this, 'ONE_MONTH')} className={selectValue === 'ONE_MONTH' ? styles.active : styles.selectDiv} id="ONE_MONTH">1个月</div>
              <div onClick={selectClick.bind(this, 'TWO_MONTH')} className={selectValue === 'TWO_MONTH' ? styles.active : styles.selectDiv} id="TWO_MONTH">2个月</div>
              <div onClick={selectClick.bind(this, 'THREE_MONTH')} className={selectValue === 'THREE_MONTH' ? styles.active : styles.selectDiv} id="THREE_MONTH">3个月</div>
              <div onClick={selectClick.bind(this, 'FOUR_MONTH')} className={selectValue === 'FOUR_MONTH' ? styles.active : styles.selectDiv} id="FOUR_MONTH">4个月</div>
              <div onClick={selectClick.bind(this, 'FIVE_MONTH')} className={selectValue === 'FIVE_MONTH' ? styles.active : styles.selectDiv} id="FIVE_MONTH">5个月</div>
            </div>
            <div className={styles.selectRow}>
              <div onClick={selectClick.bind(this, 'SIX_MONTH')} className={selectValue === 'SIX_MONTH' ? styles.active : styles.selectDiv} id="SIX_MONTH">6个月</div>
              <div onClick={selectClick.bind(this, 'SEVEN_MONTH')} className={selectValue === 'SEVEN_MONTH' ? styles.active : styles.selectDiv} id="SEVEN_MONTH">7个月</div>
              <div onClick={selectClick.bind(this, 'EIGHT_MONTH')} className={selectValue === 'EIGHT_MONTH' ? styles.active : styles.selectDiv} id="EIGHT_MONTH">8个月</div>
              <div onClick={selectClick.bind(this, 'NINE_MONTH')} className={selectValue === 'NINE_MONTH' ? styles.active : styles.selectDiv} id="NINE_MONTH">9个月</div>
              <div onClick={selectClick.bind(this, 'ONE_YEAR')} className={selectValue === 'ONE_YEAR' ? styles.active : styles.selectDiv} id="ONE_YEAR">
                {/* <span className={styles.discount}>惠</span> */}
                10个月＝1年
              </div>
            </div>
          </div>
        </div>
        <div className={styles.message3}>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Modal confirmText="确定"
             cancelText="取消"
             width={width}
             closeAction={closeModal}
             cancelAction={closeModal}
             confirmAction={payClick}
             confirmLoading={btnLoading}
             visible={visible}
             pointText={pointText}
             pactUrl={pactUrl}
             title={tittle}
             pactName={pactName}
             isNeedBtn
      >
        <div className={styles.contentWrap}>
          {modalContent}
        </div>
      </Modal>
    </div>
  );
}

PayModal.propTypes = {
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
export default inject('payModalStore')(observer(PayModal));
