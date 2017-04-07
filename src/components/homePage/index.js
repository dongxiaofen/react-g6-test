import React, { Component } from 'react';
import { HeaderNavBar, Footer } from 'components';
import styles from './index.less';

import bannerShape1 from 'imgs/homePage/banner_shape1.png';
import bannerShape2 from 'imgs/homePage/banner_shape2.png';

import homeBox1Img1 from 'imgs/homePage/home_box1_1.png';
import homeBox1Img2 from 'imgs/homePage/home_box1_2.png';
import homeBox1Img3 from 'imgs/homePage/home_box1_3.png';
import homeBox1Img4 from 'imgs/homePage/home_box1_4.png';
import homeBox1Img5 from 'imgs/homePage/home_box1_5.png';

import homeBox2Img1 from 'imgs/homePage/home_box2_1.png';
import homeBox2Img2 from 'imgs/homePage/home_box2_2.png';
import homeBox2Img3 from 'imgs/homePage/home_box2_3.png';
import homeBox2Img4 from 'imgs/homePage/home_box2_4.png';

import homeLogo from 'imgs/homePage/home_logo.png';
import bannerArrow from 'imgs/homePage/home_banner_arrow.png';

let TweenMax;
export default class HomeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderScroll: '',
    };
  }

  componentDidMount() {
    (function initFram() {
      const vendors = ['webkit', 'moz'];
      for (let idx = 0; idx < vendors.length && !window.requestAnimationFrame; ++idx) {
        const vp = vendors[idx];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
      }
      if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        let lastTime = 0;
        window.requestAnimationFrame = function nowTime(callback) {
          const now = Date.now();
          const nextTime = Math.max(lastTime + 16, now);
          return setTimeout(function time() { callback(lastTime = nextTime); }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
      }
    }());

    TweenMax = require('gsap/src/minified/TweenMax.min');
    const homeBannerTitle = document.getElementById('home-banner-title');
    const homeBannerTxt1 = document.getElementById('home-banner-txt1');
    const homeBannerTxt2 = document.getElementById('home-banner-txt2');
    let bodyScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    let homeBox1OffsetTop = document.getElementById('home-box1').offsetTop;
    const homeBox1Txt = document.getElementById('home-box1-txt');
    const homeBox1Icon = document.getElementById('home-box1-icon');

    let homeBox2OffsetTop = document.getElementById('home-box2').offsetTop;
    const homeBox2Txt = document.getElementById('home-box2-txt');
    const box2ContentBlock1 = document.getElementById('box2-content-block1');
    const box2ContentBlock2 = document.getElementById('box2-content-block2');

    TweenMax.to(homeBannerTitle, 0.8, {
      y: 0,
      opacity: 1,
      delay: 0.5,
      ease: 'easeInOut',
    });
    TweenMax.to(homeBannerTxt1, 0.8, {
      opacity: 1,
      delay: 1.5,
      ease: 'easeInOut',
    });
    TweenMax.to(homeBannerTxt2, 0.8, {
      opacity: 1,
      delay: 1.5,
      ease: 'easeInOut',
    });

    const homeBanner = document.getElementById('home-banner');
    let clientWidth;
    let clientHeight;
    window.addEventListener('load', () => {
      clientWidth = document.documentElement.clientWidth;
      clientHeight = document.documentElement.clientHeight;
      homeBanner.style.height = clientHeight + 'px';

      const oCanvas = document.getElementById('canvas');
      oCanvas.width = clientWidth - 30;
      oCanvas.height = clientHeight - 30;

      const originX = clientWidth / 2;
      const originY = clientHeight / 2;

      const ctx = oCanvas.getContext('2d');

      const stars = [];

      const clientRadian = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight);

      function createStar() {
        const radian = Math.random() * 360 * Math.PI / 180;
        const rRadius = Math.random() * clientRadian - clientRadian / 2;
        const star = {
          x: originX + rRadius * Math.sin(radian),
          y: originY + rRadius * Math.cos(radian),
          radius: 1,
          radian: radian,
          rRadius: rRadius,
          color: '#5CA3FD',
          speed: Math.random() + 0.06,
          draw: function drawArc() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
          }
        };
        return star;
      }

      for (let idx = 0; idx < 400; idx++) {
        stars.push(createStar());
      }

      function draw() {
        ctx.clearRect(0, 0, oCanvas.width, oCanvas.height);
        let star;

        const date = new Date();
        const second = date.getSeconds();
        if (second % 6 === 0) {
          stars.push(createStar());
        }

        for (let idx = 0; idx < stars.length; idx++) {
          star = stars[idx];
          star.draw();

          let arr;
          if (star.rRadius > 0) {
            arr = star.rRadius + star.speed;
          } else {
            arr = star.rRadius - star.speed;
          }
          star.x = originX + (arr) * Math.sin(star.radian);
          star.y = originY + (arr) * Math.cos(star.radian);
          star.rRadius = arr;

          if (star.x < 0 || star.y < 0 || star.x > oCanvas.width || star.y > oCanvas.height) {
            stars.splice(idx, 1);
          }
        }
        requestAnimationFrame(draw);
      }
      draw();
    });

    window.onscroll = () => {
      bodyScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      homeBox1OffsetTop = document.getElementById('home-box1').offsetTop;
      homeBox2OffsetTop = document.getElementById('home-box2').offsetTop;
      if (bodyScrollTop >= homeBox1OffsetTop) {
        this.setState({
          isHeaderScroll: '1',
        });
      } else {
        this.setState({
          isHeaderScroll: '',
        });
      }
      if (bodyScrollTop >= homeBox1OffsetTop / 2) {
        TweenMax.to(homeBox1Txt, 0.7, {
          y: 0,
          opacity: 1,
          ease: 'easeInOut',
        });
        TweenMax.to(homeBox1Icon, 0.7, {
          y: 0,
          delay: 0.3,
          opacity: 1,
          ease: 'easeInOut',
        });
      }

      if (bodyScrollTop >= homeBox2OffsetTop / 1.5) {
        TweenMax.to(homeBox2Txt, 0.7, {
          y: 0,
          opacity: 1,
          ease: 'easeInOut',
        });
        TweenMax.to(box2ContentBlock1, 0.7, {
          y: 0,
          opacity: 1,
          delay: 0.3,
          ease: 'easeInOut',
        });
        TweenMax.to(box2ContentBlock2, 0.7, {
          y: 0,
          opacity: 1,
          delay: 0.6,
          ease: 'easeInOut',
        });
      }
    };
    window.addEventListener('resize', () => {
      // clientWidth = document.documentElement.clientWidth;
      clientHeight = document.documentElement.clientHeight;
      homeBanner.style.height = clientHeight + 'px';
    });
  }
  arrowOnClick = () => {
    const homeBox1OffsetTop = document.getElementById('home-box1').offsetTop;
    const ua = navigator.userAgent.toLowerCase();
    let oBody;
    if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/) || ua.match(/firefox\/([\d.]+)/)) {
      oBody = document.documentElement;
    } else {
      oBody = document.body;
    }
    TweenMax.to(oBody, 0.5, {scrollTop: homeBox1OffsetTop, ease: 'easeInOut'});
  }
  render() {
    return (
      <div>
        <HeaderNavBar isHeaderScroll={this.state.isHeaderScroll} home="1" {...this.props} />
        <div id="home-banner" className={`clearfix ${styles['home-banner']}`}>
          <canvas id="canvas" className={styles.webGL}></canvas>
          <h1 id="home-banner-title">定制化风险决策平台&nbsp;&nbsp;用数据连接管理</h1>
          <p id="home-banner-txt1">集合移动互联网、大数据、云计算的前沿技术，专注企业情报信息采集与清洗，企业经营风险识别模型优化，个性风险规则自定义设计，</p>
          <p id="home-banner-txt2">为金融机构信贷管理提供全方位解决方案。</p>
          <div className={styles['banner-shape']}>
            <div className={styles['banner-shape-img1']}>
              <img src={bannerShape1} alt=""/>
            </div>
            <div className={styles['banner-shape-img2']}>
              <img src={bannerShape2} alt=""/>
            </div>
            <div className={styles['banner-shape-img3']}>
              <img src={bannerShape2} alt=""/>
            </div>
            <div className={styles['banner-shape-img4']}>
              <img src={bannerShape2} alt=""/>
            </div>
            <div className={styles['banner-shape-img5']}>
              <img src={bannerShape2} alt=""/>
            </div>
            {/* <div className={styles['banner-shape-img6']}>
             <img src={bannerShape2} alt=""/>
             </div> */}
            <div className={styles['banner-shape-text']}>
              <img src={homeLogo} alt=""/>
            </div>
          </div>
          <div className={styles['banner-arrow']}>
            <img
              className={styles['banner-arrow-img']}
              onClick={this.arrowOnClick}
              src={bannerArrow} />
          </div>
        </div>
        <div id="home-box1" className={styles['home-box1']}>
          <div className="container">
            <div id="home-box1-txt" className={styles['home-box1-txt']}>
              <p className={styles['box-title']}>专业 高效的风险管理产品</p>
              <p className={styles['box-content']}>提供全方位企业信息查询、风险监控、风险分析、风险预警、风险管理等一体化服务，解决金融机构在收集企业信息效率低，风险评估信息批量处</p>
              <p className={styles['box-content']}>理难度大、贷后管理滞后、预警不及时等问题。</p>
            </div>
            <ul id="home-box1-icon" className={`clearfix ${styles['home-box1-content']}`}>
              <li>
                <div className={styles['home-box1-img']}>
                  <img src={homeBox1Img1} alt=""/>
                </div>
                <p className={styles['box1-content-title']}>快速查询</p>
                <p className={styles['box1-content-txt']}>一键获取企业画像</p>
              </li>
              <li>
                <div className={styles['home-box1-img']}>
                  <img src={homeBox1Img2} alt=""/>
                </div>
                <p className={styles['box1-content-title']}>实时监控</p>
                <p className={styles['box1-content-txt']}>追捕异常蛛丝马迹</p>
              </li>
              <li>
                <div className={styles['home-box1-img']}>
                  <img src={homeBox1Img3} alt=""/>
                </div>
                <p className={styles['box1-content-title']}>关联分析</p>
                <p className={styles['box1-content-txt']}>深度挖掘潜在风险</p>
              </li>
              <li>
                <div className={styles['home-box1-img']}>
                  <img src={homeBox1Img4} alt=""/>
                </div>
                <p className={styles['box1-content-title']}>风险预警</p>
                <p className={styles['box1-content-txt']}>即时推送异常警告</p>
              </li>
              <li>
                <div className={styles['home-box1-img']}>
                  <img src={homeBox1Img5} alt=""/>
                </div>
                <p className={styles['box1-content-title']}>智能管理</p>
                <p className={styles['box1-content-txt']}>全面提升工作效率</p>
              </li>
            </ul>
          </div>
        </div>
        <div id="home-box2" className={styles['home-box2']}>
          <div id="home-box2-txt" className={styles['home-box2-txt']}>
            <p className={styles['box-title']}>前沿 领先的大数据技术</p>
            <p className={styles['box-content']}>平台采用具备全球领先水平的开源技术作为研发的基础和支撑，从海量数据收集，到数据清洗整理，数据建模分析，数据可视化处理，我们的数据科</p>
            <p className={styles['box-content']}>学家团队均有自己独到的见解和领先的技术能力。</p>
          </div>
          <div className={styles['home-box2-content']}>
            <div id="box2-content-block1" className={`clearfix ${styles['box2-content-block1']}`}>
              <div className={styles['box2-content-itemL']}>
                <div className={styles['box2-item-img']}>
                  <img src={homeBox2Img1} alt=""/>
                </div>
                <p className={styles['box2-item-title']}>数据采集</p>
                <p className={styles['box2-item-txt']}>通过部署分布式爬虫引擎和对接权威数据接口，实现全量大数据采集，并且去杂，去重，整合后入库。</p>
              </div>
              <div className={styles['box2-content-itemR']}>
                <div className={styles['box2-item-img']}>
                  <img src={homeBox2Img2} alt=""/>
                </div>
                <p className={styles['box2-item-title']}>深度挖掘</p>
                <p className={styles['box2-item-txt']}>深度分析企业关联网络，计算出风险传导路径，突出异常节点，将风险事件序列化，形成企业健康趋势。</p>
              </div>
            </div>
            <div id="box2-content-block2" className={`clearfix ${styles['box2-content-block2']}`}>
              <div className={styles['box2-content-itemL']}>
                <div className={styles['box2-item-img']}>
                  <img src={homeBox2Img3} alt=""/>
                </div>
                <p className={styles['box2-item-title']}>机器学习</p>
                <p className={styles['box2-item-txt']}>独立研发MaaS系统，根据用户提交的数据处理请求，匹配最优算法。同时，系统具备自学习、自优化能力。</p>
              </div>
              <div className={styles['box2-content-itemR']}>
                <div className={styles['box2-item-img']}>
                  <img src={homeBox2Img4} alt=""/>
                </div>
                <p className={styles['box2-item-title']}>可视化处理</p>
                <p className={styles['box2-item-txt']}>数据分析结果可视化处理，支持多种类型图表、终端页面展示，让数据说话。</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
