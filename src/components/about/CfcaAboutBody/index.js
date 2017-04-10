import { observer } from 'mobx-react';
import styles from './index.less';
import React, { Component, PropTypes} from 'react';
import { HeaderNavBar, CfcaFooter } from 'components';

import img1 from 'imgs/cfca/1.png';
import img2 from 'imgs/cfca/2.png';
import img3 from 'imgs/cfca/3.png';
import img4 from 'imgs/cfca/4.png';
import img5 from 'imgs/cfca/5.png';
import img6 from 'imgs/cfca/6.png';
import img7 from 'imgs/cfca/7.png';
import img8 from 'imgs/cfca/8.png';
import img9 from 'imgs/cfca/9.png';
import img10 from 'imgs/cfca/10.png';
import img11 from 'imgs/cfca/11.png';
import img12 from 'imgs/cfca/12.png';
import img13 from 'imgs/cfca/13.png';
import img14 from 'imgs/cfca/14.png';
import img15 from 'imgs/cfca/15.png';
import img16 from 'imgs/cfca/16.png';


@observer
export default class CfcaAboutBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderScroll: '',
    };
  }
  componentDidMount() {
    const TweenMax = require('gsap/src/minified/TweenMax.min');
    const aboutBannerTitle = document.getElementById('about-banner-title');
    const aboutBannerContent1 = document.getElementById('about-banner-content1');
    const aboutBannerContent2 = document.getElementById('about-banner-content2');

    window.onscroll = () => {
      const bodyScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const aboutBoxOffsetTop = document.getElementById('about-box').offsetTop;
      if (bodyScrollTop >= aboutBoxOffsetTop - 100) {
        this.setState({
          isHeaderScroll: '1',
        });
      } else {
        this.setState({
          isHeaderScroll: '',
        });
      }
    };
    TweenMax.to(aboutBannerTitle, 0.7, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      ease: 'easeInOut',
    });
    TweenMax.to(aboutBannerContent1, 0.7, {
      y: 0,
      opacity: 1,
      delay: 0.7,
      ease: 'easeInOut',
    });
    TweenMax.to(aboutBannerContent2, 0.7, {
      y: 0,
      opacity: 1,
      delay: 1,
      ease: 'easeInOut',
    });
  }
  static proptypes = {
    styles: PropTypes.object
  }
  render() {
    return (
      <div>
        <HeaderNavBar isHeaderScroll={this.state.isHeaderScroll} about="1" {...this.props} />
        <div className={`clearfix ${styles['about-banner']}`}>
          <div id="about-banner-title" className={styles['about-banner-title']}>专注于挖掘企业大数据</div>
          <div className={styles['about-container']}>
            <div className={styles['about-banner-content']}>
              <p id="about-banner-content1" className={styles['about-banner-content1']}>风险监控平台是中国金融认证中心、中金支付重力打造的金融信息风险技术服务平台，它以互联网技术为载体、结合行业数据，专注信息汇总、数据挖掘、数据应用，致力于为金融机构、政府部门、大型企业等客户提供最优质的大数据解决方案。</p>
              <p id="about-banner-content2" className={styles['about-banner-content2']}>
                我们带着为客户降低风险、辅助信贷决策、精准营销&拓客展业的目标深耕大数据金融服务，志行励远。
              </p>
            </div>
          </div>
        </div>
        <div id="about-box" className={styles['about-box-bg']}>
          <div className={styles['about-container']}>
            <div className={styles['about-box']}>
              <div className={styles['about-box-title']}>合作伙伴</div>
              <div className={`clearfix ${styles['about-box-row']}`}>
                <div className={styles['about-box-item']}>
                  <img src={img1} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img2} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img3} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img4} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img5} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img6} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img7} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img8} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img9} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img10} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img11} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img12} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img13} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img14} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img15} alt=""/>
                </div>
                <div className={styles['about-box-item']}>
                  <img src={img16} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CfcaFooter />
      </div>
    );
  }
}

