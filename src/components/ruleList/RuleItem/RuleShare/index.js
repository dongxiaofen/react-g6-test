import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleShare({data, changeRuleShare, setItemData, modalStore}) {
  // 修改状态
  const changeStatus = () => {
    setItemData(data);
    const text = data.rule.share ? '关闭后该规则将不分享' : '开启后该规则将分享';
    // 打开model
    const args = {
      title: text,
      isSingleBtn: false,
      isNeedBtn: true,
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
  if (data && data.rule) {
    text = data.rule.share ? '已分享' : '未分享';
  }
  return (
    <div onClick={changeStatus.bind(this)} className={styles.box}>
      <i className={data.rule.share ? styles.shareImgOpen : styles.shareImgDown}></i>
      <span className={data.rule.share ? styles.text : styles.text2}>{text}</span>
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
