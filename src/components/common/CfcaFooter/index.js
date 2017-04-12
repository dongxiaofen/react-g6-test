import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import styles from './index.less';
import footerIcon1 from 'imgs/footer/footer_icon_1.png';
import footerIcon2 from 'imgs/footer/footer_icon_2.png';
import footerIcon3 from 'imgs/footer/footer_icon_3.png';
import footerIcon4 from 'imgs/footer/footer_icon_4.png';
import iconPolice from 'imgs/icon-police.png';

function CfcaFooter() {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row">
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
              中国金融认证中心
            </div>
            <div className={`fs7 ${styles['footer-text']} ${styles['mb-20']}`}>
              技术支持单位：中金支付 重庆誉存大数据科技有限公司
            </div>
            <div className={`clearfix ${styles['footer-text']} ${styles['mb-20']}`}>
              <img className="pull-left" src={iconPolice} alt=""/>
              <span className={styles['police-text']}>京ICP证120015号 京公网安备110102005601</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.detail}>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon1} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  中国金融认证中心、中金支付
                </div>
              </div>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon2} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  北京市西城区菜市口南大街平原里20-3
                </div>
              </div>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon3} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  400-860-9888，400-007-6633
                </div>
              </div>
              <div className={`clearfix ${styles['footer-detail']}`}>
                <div className={styles['footer-detail-img']}>
                  <img src={footerIcon4} alt=""/>
                </div>
                <div className={`${styles['footer-detail-text']} ${styles['footer-text']}`}>
                  daas@cfca.com.cn
                </div>
              </div>
            </div>
          </div>
          {/* <div className="clearfix col-md-4">
           <div className={styles['footer-twoCode']}>
           <div className={styles['footer-twoCode-img']}>
           <img src={footerTwoCode1} alt=""/>
           </div>
           <div className={`${styles['footer-twoCode-text']} ${styles['footer-text']}`}>
           下载APP
           </div>
           </div>
           </div> */}
        </div>
      </div>
    </div>
  );
}

CfcaFooter.propTypes = {
  foo: PropTypes.string,
};
export default observer(CfcaFooter);
