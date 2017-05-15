import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NowRecordImg({nowRecordStore}) {
  // 大图旋转角度情况
  const transformImg = nowRecordStore.transform;
  let transformStyle = '';
  switch (transformImg) {
    case 1:
      transformStyle = styles.transformA;
      break;
    case 2:
      transformStyle = styles.transformB;
      break;
    case 3:
      transformStyle = styles.transformC;
      break;
    case 0:
      transformStyle = styles.transformD;
      break;
    default:
      transformStyle = '';
  }
  const pre = () => {
    nowRecordStore.pre();
  };
  const next = () => {
    nowRecordStore.next();
  };
  const transform = () => {
    nowRecordStore.transformImg();
  };
  const closeImg = () => {
    nowRecordStore.closeImg();
  };
  return (
    <div className={styles.box}>
      <div className={nowRecordStore.show === false ? styles.displayNone : styles.showWrap}>
        <div className={styles.showBd}></div>
        <div className={styles.showCon}>
          <div className={styles.imgBox}>
            <img
              className={styles.showImg + ' ' + transformStyle}
              alt=""
              src={'data:image/png;base64,' + nowRecordStore.imgTxt} />
          </div>
          <div className={styles.topInput}>
            <div className={styles.topCenter}>
              <i onClick={pre.bind(null)} title="上一张" className={'fa fa-arrow-left '}></i>
              <i onClick={transform.bind(null)} title="旋转" className={'fa fa-repeat '}></i>
              <i onClick={next.bind(null)} title="下一张" className={'fa fa-arrow-right '}></i>
            </div>
            <i onClick={closeImg.bind(null)} className={'fa fa-times ' + styles.close}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

NowRecordImg.propTypes = {
  nowRecordStore: PropTypes.object,
};
export default observer(NowRecordImg);
