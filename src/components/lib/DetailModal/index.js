import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class DetailModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    isNeedheight: PropTypes.bool,
    titleComp: PropTypes.func,
    contentComp: PropTypes.func,
    sourceComp: PropTypes.func,
    closeAction: PropTypes.func,
    leftBarComp: PropTypes.func
  };

  componentDidMount() {
    this.bodyStyle();
  }

  componentDidUpdate() {
    this.bodyStyle();
    setTimeout(() => {
      this.contentStyle();
    }, 100);
  }

  getStyle(ele) {
    let style = null;
    if (window.getComputedStyle) {
      style = window.getComputedStyle(ele, null);
    } else {
      style = ele.currentStyle;
    }
    return style;
  }

  contentStyle() {
    const detailModalTag = this.refs['detail-modal'];
    const titleTag = this.refs['detail-modal-title'];
    const contentTag = this.refs['detail-modal-content'];

    const titleTagHeight = parseInt(this.getStyle(titleTag).height, 10);
    contentTag.style.height = 630 - titleTagHeight - 60 + 'px';
    contentTag.scrollTop = 0;

    // 设置modal相对于顶部的高度
    const windowHeight = document.documentElement.clientHeight;
    detailModalTag.style.marginTop = windowHeight / 2 - 315 + 'px';
  }

  // 隐藏body的滚动条
  bodyStyle() {
    const body = document.getElementsByTagName('body')[0];
    if (this.props.visible) {
      body.style.overflowY = 'hidden';
    } else {
      body.removeAttribute('style');
    }
  }

  render() {
    const modalBox = this.props.visible
      ? `${styles.modal} ${styles.modalVisible}`
      : `${styles.modal}`;
    const contentBox = this.props.visible
      ? `${styles.contentLayer} ${styles.visible}`
      : `${styles.contentLayer}`;
    return (
      <div className={modalBox}>
        <div ref="detail-modal" className={contentBox}>
          <div ref="detail-modal-title" className="clearfix">
            <div className={`clearfix ${styles.title}`}>
              <div className={styles.titleName}>{this.props.title}</div>
              <div className={styles.close} onClick={this.props.closeAction}>
                <i className="fa fa-times"></i>
              </div>
            </div>
            <div className="clearfix">
              {this.props.titleComp ? <this.props.titleComp /> : null}
            </div>
            <div className={styles.line}></div>
          </div>
          <div ref="detail-modal-leftBar" className={styles.leftBar}>
            {
              this.props.leftBarComp ? <this.props.leftBarComp /> : null
            }
          </div>
          <div ref="detail-modal-content" className={`clearfix ${styles.content}`}>
            {this.props.contentComp ? <this.props.contentComp /> : null}
          </div>
          <div ref="detail-modal-source" className={`clearfix ${styles.source}`}>
            {this.props.sourceComp ? <this.props.sourceComp /> : null}
          </div>
        </div>
      </div>
    );
  }
}
