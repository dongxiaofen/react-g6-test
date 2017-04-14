import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import downloadColse from 'imgs/login/loginColse.png';
import getPermissionMeta from 'helpers/getPermissionMeta';
import pathval from 'pathval';

function DownLoadApp({clientStore}) {
  const text = '扫描二维码 下载APP';
  const envConfig = pathval.getPathValue(clientStore, 'envConfig');
  const closeDownloadOnClick = () => {
    document.getElementById('download-box').style.display = 'none';
  };

  return (
    <div
      id="download-box"
      className={
        `clearfix ${styles.downloadBg}`
      }>
      <div id="download-app" className={`clearfix ${styles.download}`}>
        <div
          className={`clearfix ${styles.downloadClose}`}
          onClick={closeDownloadOnClick}>
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
  clientStore: PropTypes.object,
};
export default inject('clientStore')(observer(DownLoadApp));
