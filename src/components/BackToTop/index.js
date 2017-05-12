import React, { Component } from 'react';
import styles from './index.less';

let bodyScroll;
let timer;
let scrollFun;
let mouseWheel;
export default class BackToTop extends Component {
  componentDidMount() {
    bodyScroll = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
    scrollFun = () => {
      bodyScroll = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
      if (bodyScroll >= 71) {
        this.refs.backTop.className = styles.backTop + ' ' + styles.backTopShow;
      } else {
        this.refs.backTop.className = styles.backTop;
      }
    };
    mouseWheel = () => {
      clearInterval(timer);
    };
    window.addEventListener('scroll', scrollFun);
    window.addEventListener('mousewheel', mouseWheel);
    window.addEventListener('DOMMouseScroll', mouseWheel);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', scrollFun);
    window.removeEventListener('mousewheel', mouseWheel);
    window.removeEventListener('DOMMouseScroll', mouseWheel);
  }
  backToTopOnClick = () => {
    timer = setInterval(() => {
      const toTop = document.body.scrollTop || document.documentElement.scrollTop;
      const speed = Math.ceil(toTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop = toTop - speed;
      if (toTop <= 0) {
        clearInterval(timer);
      }
    }, 10);
  }
  render() {
    return (
      <div ref="backTop" className={styles.backTop}>
        <div className={styles.backTopBox} onClick={this.backToTopOnClick}>
          <div className={styles.backTopimg}></div>
        </div>
      </div>
    );
  }
}
