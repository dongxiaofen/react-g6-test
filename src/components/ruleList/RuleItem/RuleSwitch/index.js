import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Switch from 'components/lib/switch';
import styles from './index.less';

function RuleSwitch({data, switchLoading, changeRuleStatus, setItemData, itemData, modalStore}) {
  // 修改状态
  const changeStatus = () => {
    setItemData(data);
    const text = data.rule.ruleStatus === 'USING' ? '关闭后该预警将失效' : '开启后该预警将生效';
    // 打开model
    const args = {
      title: text,
      isSingleBtn: false,
      isNeedBtn: true,
      confirmLoading: false,
      // pointText: '创建报告即视为同意',
      // pactUrl: 'xxxxxx',
      // pactName: '用户服务协议',
      confirmText: '确定',
      confirmAction: changeRuleStatus.bind(null, data),
      cancelText: '取消',
      cancelAction: modalStore.closeAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./ModelContent'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
    // changeRuleStatus(data);
  };
  // 获取状态
  let switchFlag = '';
  let text = '';
  if (data && data.rule && data.rule.ruleStatus) {
    switchFlag = data.rule.ruleStatus === 'USING' ? true : false;
    text = data.rule.ruleStatus === 'USING' ? '开启' : '关闭';
  }
  // switchLoading 判断操作的数据是否是循环的当前数据
  let loading = false;
  if (itemData && itemData.rule && itemData.rule.id) {
    if (data.rule.id === itemData.rule.id) {
      loading = switchLoading;
    }
  }
  return (
    <div className={styles.box}>
      <span className={styles.text}>{text}</span>
      <Switch
        onChange={changeStatus}
        status={switchFlag}
        loading={loading} />
    </div>
  );
}

RuleSwitch.propTypes = {
  data: PropTypes.object,
  switchLoading: PropTypes.bool,
  itemData: PropTypes.object,
  changeRuleStatus: PropTypes.func,
  setItemData: PropTypes.func,
  modalStore: PropTypes.object,
};
export default observer(RuleSwitch);
