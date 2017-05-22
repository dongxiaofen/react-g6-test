import React, { Component, PropTypes } from 'react';
import styles from './index.less';

export default class EntireLoading extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  componentDidUpdate() {
    this.bodyStyle();
  }

  bodyStyle() {
    const body = document.getElementsByTagName('body')[0];
    if (this.props.visible) {
      body.style.overflowY = 'hidden';
    } else {
      body.removeAttribute('style');
    }
  }

  render() {
    const cssName = this.props.visible ? `${styles.blackBlock} ${styles.visible}` : styles.blackBlock;
    return (
      <div className={cssName}>
        <div className={styles.animateBox}>
          <div className={styles['sk-wave']}>
            <div className={`${styles['sk-rect']} ${styles['sk-rect1']}`}></div>
            <div className={`${styles['sk-rect']} ${styles['sk-rect2']}`}></div>
            <div className={`${styles['sk-rect']} ${styles['sk-rect3']}`}></div>
            <div className={`${styles['sk-rect']} ${styles['sk-rect4']}`}></div>
            <div className={`${styles['sk-rect']} ${styles['sk-rect5']}`}></div>
          </div>
        </div>
      </div>
    );
  }
}
