import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Button from 'components/lib/button';
import styles from './index.less';
@observer
export default class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    isNeedBtn: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isCustomize: PropTypes.bool,
    pointText: PropTypes.string,
    pactName: PropTypes.string,
    pactUrl: PropTypes.string,
    children: PropTypes.node,
    isSingleBtn: PropTypes.bool,
    // text
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    confirmWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // action
    cancelAction: PropTypes.func,
    confirmAction: PropTypes.func,
    closeAction: PropTypes.func,
    // loading
    cancelLoading: PropTypes.bool,
    confirmLoading: PropTypes.bool,
  }

  componentDidMount() {
    this.bodyStyle();
  }

  componentDidUpdate() {
    this.bodyStyle();
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

  // 确认事件
  confirmAction = () => {
    if (this.props.confirmAction) {
      this.props.confirmAction();
    }
  };

  // 取消事件
  cancelAction = () => {
    if (this.props.cancelAction) {
      this.props.cancelAction();
    }
  };

  // 关闭事件
  closeAction = () => {
    if (this.props.closeAction) {
      this.props.closeAction();
    }
  };

  render() {
    // 背景是否显示
    const modalBoxClassName = this.props.visible
      ? `${styles.modal} ${styles.modalVisible}`
      : `${styles.modal}`;
    // 弹框是否显示
    const contentBoxClassName = this.props.visible
      ? `${styles.contentLayer} ${styles.visible}`
      : `${styles.contentLayer}`;
    // 是否只有一个确定按钮
    let btnComp = (
      <div className="clearfix">
        <Button
          className={styles.cancelBtn}
          btnType="secondary"
          loading={this.props.cancelLoading}
          onClick={this.cancelAction}>
          {this.props.cancelText}
        </Button>
        <Button
          className={styles.confirmButton}
          btnType="primary"
          loading={this.props.confirmLoading}
          onClick={this.confirmAction}>
          {this.props.confirmText}
        </Button>
      </div>
    );
    if (this.props.isSingleBtn) {
      btnComp = (
        <Button
          className={styles.confirmSingleButton}
          width={this.props.confirmWidth}
          btnType="primary"
          loading={this.props.confirmLoading}
          onClick={this.confirmAction}>
          {this.props.confirmText}
        </Button>
      );
    }
    // 是否不要按钮
    let isNeedBtn = (
      <div className={styles.buttonBox}>
        {btnComp}
      </div>
    );
    if (!this.props.isNeedBtn) {
      isNeedBtn = null;
    }
    // 是否有提示文字
    let pointTextComp = null;
    if (this.props.pointText) {
      pointTextComp = (
        <div className={styles.pointText}>
          {this.props.pointText}
          《<Link to={this.props.pactUrl}>{this.props.pactName}</Link>》
        </div>
      );
    }
    // 是否是自定义弹框
    if (this.props.isCustomize) {
      return (
        <div className={modalBoxClassName}>
          <div className={contentBoxClassName} style={{ width: this.props.width }}>
            <div className={styles.closeBtn} onClick={this.closeAction}></div>
            <div className="clearfix">{this.props.children}</div>
          </div>
        </div>
      );
    }
    return (
      <div className={modalBoxClassName}>
        <div className={contentBoxClassName} style={{ width: this.props.width }}>
          <div className={styles.closeBtn} onClick={this.closeAction}></div>
          <div className={styles.title}>
            {this.props.title}
          </div>
          <div className="clearfix">{this.props.children}</div>
          {isNeedBtn}
          {pointTextComp}
        </div>
      </div>
    );
  }
}
