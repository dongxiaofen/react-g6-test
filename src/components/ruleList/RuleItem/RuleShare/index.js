import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleShare({data, changeRuleShare, setItemData, modalStore}) {
  // 修改状态
  const changeStatus = (boxClick) => {
    if (boxClick === 'disabled') {
      return true;
    }
    setItemData(data);
    const text = data.rule.share ? '关闭后该规则不会被分享给下级账号' : '开启后该规则会被分享给下级账号';
    // 打开model
    const args = {
      title: text,
      isSingleBtn: false,
      isNeedBtn: true,
      width: '470px',
      confirmLoading: false,
      // pointText: '创建报告即视为同意',
      confirmText: '确定',
      confirmAction: changeRuleShare.bind(null, data),
      cancelText: '取消',
      cancelAction: modalStore.closeAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('../RuleSwitch/ModelContent'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  };
  let text = '';
  let textStyle = '';
  let imgStyle = '';
  let boxClick = '';
  let boxStyle = '';
  if (data && data.rule && data.rule.ruleStatus && data.rule.ruleStatus === 'STOP') {
    text = '未分享';
    textStyle = styles.text2;
    imgStyle = styles.shareImgDown;
    boxClick = 'disabled';
    boxStyle = styles.boxDisabled;
  } else {
    if (data && data.rule) {
      text = data.rule.share ? '已分享' : '未分享';
      textStyle = data.rule.share ? styles.text : styles.text2;
      imgStyle = data.rule.share ? styles.shareImgOpen : styles.shareImgDown;
      boxStyle = styles.box;
    }
  }
  return (
    <div onClick={changeStatus.bind(this, boxClick)} className={boxStyle}>
      <i className={imgStyle}></i>
      <span className={textStyle}>{text}</span>
    </div>
  );
}

RuleShare.propTypes = {
  data: PropTypes.object,
  switchLoading2: PropTypes.bool,
  itemData: PropTypes.object,
  changeRuleShare: PropTypes.func,
  setItemData: PropTypes.func,
  modalStore: PropTypes.object,
};
export default observer(RuleShare);
