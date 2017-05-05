import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import fullImg from 'imgs/companyHome/network/full.png';
import exitFullImg from 'imgs/companyHome/network/exitFull.png';
import resumeImg from 'imgs/companyHome/network/resume.png';

function LegendBar({networkStore, resumeSvg, fullScreen, exitFull}) {
  //   const swithLayout = () => {
  //     switchLayout();
  //   };
  const {showFullScreen} = networkStore;
  const handleFullScreen = () => {
    fullScreen();
    this.props.networkStore.toggleFullScreen();
  };
  const handleExitFull = () => {
    exitFull();
    this.props.networkStore.toggleFullScreen();
  };
  return (
    <div className={styles.box}>
      {/* <a onClick={swithLayout}>切换</a> */}
      <div className={styles.legendAction}>
        <a className={styles.fullBtn} onClick={!showFullScreen ? handleFullScreen : handleExitFull}>{!showFullScreen ? '全屏显示' : '退出全屏'} <img className={!showFullScreen ? styles.fullIcon : styles.exitIcon} src={!showFullScreen ? fullImg : exitFullImg} /></a>
        <a className={styles.resumeBtn} onClick={resumeSvg}>位置复原 <img className={styles.resumeIcon} src={resumeImg} /></a>
      </div>
    </div>
  );
}

LegendBar.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore')(observer(LegendBar));
