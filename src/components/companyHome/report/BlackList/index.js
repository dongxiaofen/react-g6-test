import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function BlackList({}) {
  return (
    <div>
      <h2 className={styles.title}>黑名单扫描</h2>
      <div className={styles.text}>
        *依托誉存<span>300万</span>高风险数据库，涵盖<span>司法系统</span>、<span>银行系统</span>、<span>支付系统</span>等<span>黑名单及不良记录</span>，在企业关联网络中进行风险识别.
      </div>
      <div className={styles.content}>
        该功能，暂时尚未开放
      </div>
    </div>
  );
}

BlackList.propTypes = {
  foo: PropTypes.string,
};
export default observer(BlackList);
