import { observer } from 'mobx-react';
import styles from './index.less';
import React, { Component, PropTypes} from 'react';
import HeaderNavBar from 'components/common/HeaderNavBar';
import Footer from 'components/common/Footer';

import img1 from 'imgs/about/1.png';
import img2 from 'imgs/about/2.png';
import img3 from 'imgs/about/3.png';
import img4 from 'imgs/about/4.png';
import img5 from 'imgs/about/5.png';
import img6 from 'imgs/about/6.png';
import img7 from 'imgs/about/7.png';
import img8 from 'imgs/about/8.png';
import img9 from 'imgs/about/9.png';
import img10 from 'imgs/about/10.png';
import img11 from 'imgs/about/11.png';
import img12 from 'imgs/about/12.png';

@observer
export default class AboutBody extends Component {
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
    const aboutBannerContent3 = document.getElementById('about-banner-content3');

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
    TweenMax.to(aboutBannerContent3, 0.7, {
      y: 0,
      opacity: 1,
      delay: 1.3,
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
              <p id="about-banner-content1" className={styles['about-banner-content1']}>誉存科技 (SocialCredits) 是一家专注信息收集、数据挖掘、数据应用的互联网大数据公司。致力于为金融机构、政府部门、大型企业等提供大数据解决方案。</p>
              <p id="about-banner-content2" className={styles['about-banner-content2']}>
                公司由来自PayPal、Visa、eBay、Google等世界顶级金融、科技公司的大数据科学家和技术高管创立，研发总部在重庆，市场总部位于上海，旧金山设有大数据研究院，并在北京、成都、广州等地建立了市场分支机构。
              </p>
              <p id="about-banner-content3" className={styles['about-banner-content3']}>
                我们已经为超过500家企业客户提供大数据服务，广泛涵盖银行、担保、小贷、第三方支付、B2B平台、政府监管部门、汽车、商超等多个行业。
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
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


