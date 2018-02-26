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
      <p>尊敬的用户，为了给您提供更好的服务，星象-数据API平台进行了一次版本升级，您已申请的接口现由旧版持续服务，2018年5月31日后服务将停止，在此期间，您需尽快将接口对接到新版，我们已在平台右上角为您提供新旧版的切换，给您带来的不便，敬请谅解，誉存将持续为您提供优质服务！</p>
      <p>主要更新内容：</p>
      <ul>
        <li>界面全新优化，提升用户体验</li>
        <li>API接入方式优化，简化对接流程</li>
        <li>接口升级，灵活使用接口</li>
      </ul>
      <div className={styles['btn-box']}>
        <Button btnType="primary" className={styles.vsbtn} onClick={handleRoute.bind(null, 'v1')}>旧版</Button>
        <Button btnType="primary" className={styles.vsbtn} onClick={handleRoute.bind(null, 'v2')}>新版</Button>
      </div>
    </div>
  );
};
VersionAlert.propTypes = {
  routing: PropTypes.object,
};
export default inject('routing', 'modalStore', 'clientStore')(observer(VersionAlert));
