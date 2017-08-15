import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import iconPolice from 'imgs/footer/icon-police.png';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles['footer-item']}>
        <span className={styles.name}>黑名单查询平台</span>
        <span className={styles.text}>Copyright © 2016誉存保留所有权利</span>
      </div>
      <div className={styles['footer-item']}>
        <a target="_blank" className={styles['footer-text']} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50019002500288">
          <img className={styles['img-stl']} src={iconPolice} alt=""/>
          <span className={styles.text}>渝公网安备 50019002500288号</span>
        </a>
      </div>
    </div>
  );
}

Footer.propTypes = {
  styles: PropTypes.object,
};
export default observer(Footer);
