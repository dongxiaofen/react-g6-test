import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Button from 'components/lib/button';
import styles from './index.less';
const VersionAlert = ({ routing, modalStore, clientStore }) => {
  const handleRoute = (version) => {
    const pathname = `/${version}/introduce`;
    routing.push({pathname: pathname});
    clientStore.updateValue('version', version);
    modalStore.closeAction();
  };
  return (
    <div className={styles.alert}>
      <h1>更新提示</h1>
      <p>尊敬的用户，星象-数据API平台目前进行了优化改版和接口迭代，您可以选择体验新版本，也可以继续选择使用老版本，您之前的服务接口依然由老版本进行提供，且在右上角为您提供新旧版本的切换</p>
      <p>主要更新内容：</p>
      <ul>
        <li>界面优化</li>
        <li>体验优化</li>
        <li>增加白名单管理</li>
        <li>接口迭代</li>
      </ul>
      <div className={styles['btn-box']}>
        <Button btnType="primary" className={styles.vsbtn} onClick={handleRoute.bind(null, 'v1')}>老版本</Button>
        <Button btnType="primary" className={styles.vsbtn} onClick={handleRoute.bind(null, 'v2')}>新版本</Button>
      </div>
    </div>
  );
};
VersionAlert.propTypes = {
  routing: PropTypes.object,
};
export default inject('routing', 'modalStore', 'clientStore')(observer(VersionAlert));
