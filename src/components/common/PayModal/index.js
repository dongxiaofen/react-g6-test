import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import pathval from 'pathval';
import { runInAction } from 'mobx';
// import Button from 'components/lib/button';
import Modal from 'components/lib/Modal';
import Checkbox from 'components/lib/check/Checkbox';

function PayModal({onOk, payModalStore, module}) {
  // 生成报告或转为监控
  const payClick = () => {
    if (onOk) {
      onOk();
    }
  };
  // 关闭弹窗
  const closeModal = () => {
    runInAction('关闭弹窗，重置协议勾选', () => {
      pathval.setPathValue(payModalStore, `value.${module}`, false);
      pathval.setPathValue(payModalStore, 'value.checkValue', 0);
    });
  };
  const readAgreement = (checked) => {
    // const value = evt.target.checked;
    let newValue = 0;
    if (checked === 0) {
      newValue = 1;
    }
    runInAction('update checkValue', () => {
      pathval.setPathValue(payModalStore, 'value.checkValue', newValue);
    });
  };
  // 选择持续监控时间
  const selectClick = (id) => {
    runInAction('update selectValue', () => {
      pathval.setPathValue(payModalStore, 'value.selectValue', id);
    });
    // const total = 150 * number;
    // this.props.commonBoundAC.updateValue(['message1'], total, 'PAY_MODAL_UPDATE_VALUE');
  };

  // modal类型
  const modalType = pathval.getPathValue(payModalStore, 'value.modalType');
  // check
  let checked = pathval.getPathValue(payModalStore, 'value.checkValue');
  let agreement = (
    <div className={styles.agreement}>
      <Checkbox checked={checked} id="1" onChange={readAgreement.bind(this, checked)} label="尊敬的用户，根据相关规定，您通过平台查询、打印、使用企业相关信息前需要获得该企业的正式授权。" />
      {/* <span className={styles.agreementSpan}>
       尊敬的用户，根据相关规定，您通过平台查询、打印、使用企业相关信息前需要获得该企业的正式授权。
       <span>我已阅读并同意</span>
       <a href="https://www.socialcredits.cn/">
       《用户协议》
       </a>
       <span>及</span>
       <a href="https://www.socialcredits.cn/">
       《免责声明》
       </a>
       </span> */}
    </div>
  );
  // 所选标题
  let modalTitle = '';
  if (modalType === 'createReport') {
    modalTitle = pathval.getPathValue(payModalStore, 'value.title1');
  } else if (modalType === 'updateReport') {
    modalTitle = pathval.getPathValue(payModalStore, 'value.title2');
    agreement = '';
    checked = 1;
  } else if (modalType === 'createMonitor') {
    modalTitle = pathval.getPathValue(payModalStore, 'value.title3');
  } else if (modalType === 'turnMonitor') {
    modalTitle = pathval.getPathValue(payModalStore, 'value.title4');
    agreement = '';
    checked = 1;
  } else {
    modalTitle = pathval.getPathValue(payModalStore, 'value.title5');
    agreement = '';
    checked = 1;
  }
  // modal内容
  let modalContent = '';
  // 报告模块
  if (modalType === 'createReport' || modalType === 'updateReport') {
    // console.log('进入报告模块');
    modalContent = (
      <div className={styles.wrap}>
        <div className={styles.title}>
          {modalTitle}
        </div>
        {/* <div className={styles.message}>
         <span className={styles.message1}>
         消费：{this.props.payModal.get('message1')} 点
         </span>
         <span className={styles.message2}>
         （当前点数为 {this.props.payModal.get('message2')} 点）
         </span>
         </div> */}
        <div className={styles.message3}>
          {agreement}
        </div>

      </div>
    );
  }
  const selectValue = pathval.getPathValue(payModalStore, 'value.selectValue');
  // let selectText = '';
  // if (selectValue) {
  //   if (selectValue === 'ONE_MONTH') {
  //     selectText = '1个月';
  //   }
  //   if (selectValue === 'TWO_MONTH') {
  //     selectText = '2个月';
  //   }
  //   if (selectValue === 'THREE_MONTH') {
  //     selectText = '3个月';
  //   }
  //   if (selectValue === 'FOUR_MONTH') {
  //     selectText = '4个月';
  //   }
  //   if (selectValue === 'FIVE_MONTH') {
  //     selectText = '5个月';
  //   }
  //   if (selectValue === 'SIX_MONTH') {
  //     selectText = '6个月';
  //   }
  //   if (selectValue === 'SEVEN_MONTH') {
  //     selectText = '7个月';
  //   }
  //   if (selectValue === 'EIGHT_MONTH') {
  //     selectText = '8个月';
  //   }
  //   if (selectValue === 'NINE_MONTH') {
  //     selectText = '9个月';
  //   }
  //   if (selectValue === 'ONE_YEAR') {
  //     selectText = '1年';
  //   }
  // }
  // 监控模块
  if (modalType === 'createMonitor' || modalType === 'turnMonitor' || modalType === 'continueMonitor') {
    // console.log('进入监控模块');
    modalContent = (
      <div className={styles.wrap}>
        <div className={styles.title}>
          {modalTitle}
        </div>
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
        {/* <div className={styles.message}>
         <span className={styles.message1}>
         {selectText}消费：{this.props.payModal.get('message1')} 点
         </span>
         <span className={styles.message2}>
         （当前点数为 {this.props.payModal.get('message2')} 点）
         </span>
         </div> */}
        <div className={styles.message3}>
          {agreement}
        </div>
      </div>
    );
  }
  // 根据返回数据显示不同secondModal
  // const secondTitle = this.props.payModal.get('secondText');
  // modal宽度设置
  let width = 450;
  if (this.props.module === 'monitorModalStatus' || this.props.module === 'monitorListPayModal') {
    width = 550;
  }
  let output = '';
  output = (
    <div>
      <Modal loading={pathval.getPathValue(payModalStore, 'value.btnLoading')}
             confirmText="确定"
             cancelText="取消"
             width={width}
             type="other"
             closeAction={closeModal}
             cancelAction={closeModal}
             confirmAction={payClick}
             confirmLoading={pathval.getPathValue(payModalStore, 'value.btnLoading')}
             close
             visible={pathval.getPathValue(payModalStore, `value.${module}`)}>
        <div className={styles.contentWrap}>
          {modalContent}
        </div>
      </Modal>
      {/* <Modal type="info" title={secondTitle} visible={this.props.payModal.get('secondVisible')} actionText="知道了" action={this.hideModal} hideModal={this.hideModal} /> */}
    </div>
  );
  return output;
}

PayModal.propTypes = {
  payModal: PropTypes.object,
  payModalStore: PropTypes.object,
  // 生成报告 createReport
  // 刷新报告 updateReport
  // 创建监控 createMonitor
  // 转为监控 turnMonitor
  // 监控续费 continueMonitor
  onOk: PropTypes.func,
  module: PropTypes.string,
  secondCallback: PropTypes.func,
};
export default inject('payModalStore')(observer(PayModal));
