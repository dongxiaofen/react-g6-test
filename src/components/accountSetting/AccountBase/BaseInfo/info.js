import React from 'react';
import styles from './index.less';
function Info() {
  return (
    <div className={styles.infoContent}>即将删除该帐号及其下属帐号和所有资料，所有删除内容不能恢复，请确认删除？</div>
  );
}

export default Info;
