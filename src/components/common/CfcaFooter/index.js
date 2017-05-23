import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import styles from './index.less';
// import footerIcon1 from 'imgs/footer/footer_icon_1.png';
// import footerIcon2 from 'imgs/footer/footer_icon_2.png';
// import footerIcon3 from 'imgs/footer/footer_icon_3.png';
// import footerIcon4 from 'imgs/footer/footer_icon_4.png';
// import iconPolice from 'imgs/footer/icon-police.png';

function CfcaFooter() {
  return (
    <div className={styles.footer}>
      {/* <div className="container"> */}
      <ul className={`clearfix ${styles['footer-menu']}`}>
        <li>
          <a href="/"><i className={styles['footer-home-icon']}></i>首页</a>
        </li>
        <li className={styles['footer-menu-star']}></li>
        <li>
          <Link to="/solution">解决方案</Link>
        </li>
        <li className={styles['footer-menu-star']}></li>
        <li>
          <Link to="/about">关于我们</Link>
        </li>
      </ul>
      <div className={styles['footer-nav']}>
        <div className={`row ${styles['footer-nav-content']}`}>
          <div className="col-md-4">
            <div className={styles['footer-title']}><Link to="/">公司首页</Link></div>
          </div>
          <div className="col-md-4">
            <div className={styles['footer-title']}><Link to="/solution">解决方案</Link></div>

          </div>
          <div className="clearfix col-md-4">
            <div className={styles['footer-title']}><Link to="/about">关于我们</Link></div>
          </div>
        </div>

      </div>
      <div className={styles['footer-nav']}>
        <div className={styles['footer-nav-content']}>
          <div className={styles['footer-text']}>地址：北京市西域区菜市口南大街平原里20-3</div>
          <div className={styles['footer-text']}>电话：400-860-9888 / 400-007-6633</div>
          <div className={styles['footer-text']}>邮编：101300</div>
          <div className={styles['footer-text']}>Copyright@1999</div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

CfcaFooter.propTypes = {
  foo: PropTypes.string,
};
export default observer(CfcaFooter);
