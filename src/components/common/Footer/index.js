import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Link } from 'react-router';
import footerIcon1 from 'imgs/footer/footer_icon_1.png';
import footerIcon2 from 'imgs/footer/footer_icon_2.png';
import footerIcon3 from 'imgs/footer/footer_icon_3.png';
import footerIcon4 from 'imgs/footer/footer_icon_4.png';
import footerTwoCode1 from 'imgs/homePage/downloadApp2.png';
import footerTwoCode2 from 'imgs/footer/footer_two_2.png';
import iconPolice from 'imgs/footer/icon-police.png';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={`clearfix ${styles['footer-container']}`}>
        <div className="rows">
          <div className={`clearfix col-md-12 ${styles['footer-logo']}`}>
            <div className={styles['footer-logo-img']}>
            </div>
            <div className={`fs6 ${styles['footer-logo-text']}`}>
              星象 风险监控平台
            </div>
          </div>
          <div className="col-md-4">
            <ul className={`clearfix ${styles['footer-menu']}`}>
              <li>
                <a href="/">首页</a>
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
            <div className={`fs7 ${styles['footer-text']} ${styles['mb-20']}`}>
              Copyright &copy; 2016誉存保留所有权利
            </div>
            <div className={`${styles['footer-text']} ${styles['mb-20']}`}>
              <a target="_blank" className={`clearfix ${styles['footer-text']}`} href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50019002500288">
                <img className="pull-left" src={iconPolice} alt=""/>
                <span className={styles['police-text']}>渝公网安备 50019002500288号</span>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.detail}>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon1} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  重庆誉存大数据科技有限公司
                </div>
              </div>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon2} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  重庆市两江新区黄山大道中段55号麒麟C-9
                </div>
              </div>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon3} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  023-67039558
                </div>
              </div>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon4} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  info@socialcredits.cn
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix col-md-4">
            <div className={styles['footer-twoCode']}>
              <div className={styles['footer-twoCode-img']}>
                <img src={footerTwoCode2} alt=""/>
              </div>
              <div className={`${styles['footer-twoCode-text']} ${styles['footer-text']}`}>
                微信公众号
              </div>
            </div>
            <div className={styles['footer-twoCode']}>
              <div className={styles['footer-twoCode-img']}>
                <img src={footerTwoCode1} alt=""/>
              </div>
              <div className={`${styles['footer-twoCode-text']} ${styles['footer-text']}`}>
                下载APP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  styles: PropTypes.object,
};
export default observer(Footer);
