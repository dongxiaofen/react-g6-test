import React, { Component, PropTypes } from 'react';
import { DownLoadApp } from 'components/downLoadApp';
import HomeMain from './HomeMain';
import CfcaMain from './CfcaMain';
import MainBody from './MainBody';
import { observer, inject } from 'mobx-react';
import pathval from 'pathval';

let TweenMax;

@inject('clientStore')
@observer

export default class HomeBody extends Component {
  static propTypes = {
    clientStore: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      isHeaderScroll: '',
    };
  }

  componentDidMount() {
    if (this.props.clientStore.envConfig === 'local') {
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
            return setTimeout(function time() {
              callback(lastTime = nextTime);
            }, nextTime - now);
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
    //  如果没有动画就不执行上面的动画方法
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
    let output;
    const envConfig = pathval.getPathValue(this.props.clientStore, 'envConfig');
    if (envConfig === 'dianxin_prod') {
      output = <MainBody />;
    }else if (envConfig === 'cfca_prod') {
      output = <CfcaMain />;
    } else {
      output = <HomeMain arrowOnClick={this.arrowOnClick} />;
    }
    return (
      <div>
        <DownLoadApp />
        { output }
      </div>
    );
  }
}
