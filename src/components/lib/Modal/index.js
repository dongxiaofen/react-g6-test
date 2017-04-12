import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Button from 'components/lib/button';
import styles from './index.less';
@observer
export default class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    type: PropTypes.string,
    iconType: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    // text
    infoText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    // action
    infoAction: PropTypes.func,
    cancelAction: PropTypes.func,
    confirmAction: PropTypes.func,
    closeAction: PropTypes.func,
    // loading
    infoLoading: PropTypes.bool,
    cancelLoading: PropTypes.bool,
    confirmLoading: PropTypes.bool,
  }

  static defaultProps = {
    width: '440px',
    type: 'base',
    iconType: 'info',
    infoText: '知道了',
    cancelText: '取消',
    confirmText: '确定',
    infoLoading: false,
    confirmLoading: false,
    cancelLoading: false,
  };

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

  // infoModal的action事件
  infoAction = () => {
    if (this.props.infoAction) {
      this.props.infoAction();
    }
  }

  /**
   * modal类别
   * 现目前两种
   * 1. info icon，title，一个操作按钮
   * 2. 有title，内容是自己定义的组件， 有两个操作按钮
   */
  infoModal() {
    // info icon的类别
    const iconCssClass = styles[`${this.props.iconType}Icon`];
    return (
      <div>
        <div className={styles.closeBtn} onClick={this.closeAction}></div>
        <div className={styles.iconBox}>
          <div className={iconCssClass}></div>
        </div>
        <div className={styles.title}>
          {this.props.title}
        </div>
        <div className={styles.buttonBox}>
          <Button className={styles.button} loading={this.props.infoLoading} onClick={this.infoAction}>
            {this.props.infoText}
          </Button>
        </div>
      </div>
    );
  }

  compModal() {
    const children = this.props.children
      ? <div className="clearfix">{this.props.children}</div>
      : null;
    return (
      <div>
        <div className={styles.closeBtn} onClick={this.closeAction}></div>
        <div className={styles.title}>
          {this.props.title}
        </div>
        {children}
        <div className={styles.buttonBox}>
          <Button
            className={styles.cancelBtn}
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
      </div>
    );
  }

  render() {
    let output = null;
    // 背景是否显示
    const modalBoxClassName = this.props.visible
      ? `${styles.modal} ${styles.modalVisible}`
      : `${styles.modal}`;
    // 弹框是否显示
    const contentBoxClassName = this.props.visible
      ? `${styles.contentLayer} ${styles.visible}`
      : `${styles.contentLayer}`;
    switch (this.props.type) {
      case 'info':
        output = this.infoModal();
        break;
      case 'comp':
        output = this.compModal();
        break;
      default:
        return null;
    }
    return (
      <div className={modalBoxClassName}>
        <div className={contentBoxClassName} style={{ width: this.props.width }}>
          {output}
        </div>
      </div>
    );
  }
}
