import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import getPermissionMeta from 'helpers/getPermissionMeta';

function DownLoadApp() {
  const text = '扫描二维码 下载APP';
  // const envConfig = this.props.client.get('envConfig');
  const envConfig = 'cfca_prod';
  const downloadColse = 'cfca_prod';
  return (
    <div
      id="download-box"
      className={
        `clearfix ${styles.downloadBg}`
      }>
      <div id="download-app" className={`clearfix ${styles.download}`}>
        <div
          className={`clearfix ${styles.downloadClose}`}
          onClick={this.closeDownloadOnClick}>
          <img className={styles.downloadColseImg} src={downloadColse} alt=""/>
        </div>
        <div className={styles.downloadText}>{text}</div>
        <div className={styles.downloadImg}>
          <img src={getPermissionMeta(envConfig).downloadApp} alt=""/>
        </div>
      </div>
    </div>
  );
}

DownLoadApp.propTypes = {
  getPermissionMeta: PropTypes.func,
};
export default observer(DownLoadApp);
