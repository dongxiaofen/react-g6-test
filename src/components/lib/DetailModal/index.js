import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class DetailModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    titleComp: PropTypes.func,
    contentComp: PropTypes.func,
    sourceComp: PropTypes.func,
    closeAction: PropTypes.func,
  };

  componentDidMount() {
    this.bodyStyle();
  }

  componentDidUpdate() {
    this.bodyStyle();
    const detailModalTag = document.getElementById('detail-modal');
    const titleTag = document.getElementById('detail-modal-title');
    const contentTag = document.getElementById('detail-modal-content');
    const sourceTag = document.getElementById('detail-modal-source');

    const detailModalTagHeight = parseInt(this.getStyle(detailModalTag).height, 10);
    const titleTagHeight = parseInt(this.getStyle(titleTag).height, 10);
    const sourceTagHeight = parseInt(this.getStyle(sourceTag).height, 10);
    contentTag.style.height = detailModalTagHeight - titleTagHeight - sourceTagHeight + 'px';
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
        <div id="detail-modal" className={contentBox}>
          <div id="detail-modal-title" className="clearfix">
            <div className={`clearfix ${styles.title}`} onClick={this.props.closeAction}>
              点击关闭查看
              <div className={styles.closeIcon}></div>
            </div>
            <div className="clearfix">
              {this.props.titleComp ? <this.props.titleComp /> : null}
            </div>
            <div className={styles.line}></div>
          </div>
          <div id="detail-modal-content" className={`clearfix ${styles.content}`}>
            {this.props.contentComp ? <this.props.contentComp /> : null}
          </div>
          <div id="detail-modal-source" className={`clearfix ${styles.source}`}>
            {this.props.sourceComp ? <this.props.sourceComp /> : null}
          </div>
        </div>
      </div>
    );
  }
}
