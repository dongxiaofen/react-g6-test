import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import loadingRisk from 'imgs/companyHome/risk/loadingRisk.gif';
import loadingCircle from 'imgs/companyHome/risk/loadingCircle.png';

function Loading({}) {
  return (
    <div className={styles.box}>
      <div className={`${styles.wrap} clearfix`}>
        <img className={styles.imgConent} src={loadingRisk} />
        <div className={styles.circleWrap}>
          <img className={`${styles.imgCircle}`} src={loadingCircle} />
        </div>
      </div>
    </div>
  );
}

Loading.propTypes = {
  foo: PropTypes.string,
};
export default observer(Loading);
