import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

@observer
export default class componentName extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    content: PropTypes.string,
    closeAction: PropTypes.func,
    clearTimer: PropTypes.func,
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this.props.clearTimer();
      this.props.closeAction();
    }
  }

  render() {
    const messageClass = this.props.visible ? `${styles.message} ${styles.visible}` : `${styles.message}`;
    const messageBoxClass = this.props.type === 'info' ? styles.messageBoxInfo : styles.messageBoxWarning;
    return (
      <div className={messageClass}>
        <div className={messageBoxClass}>
          {this.props.content}
        </div>
      </div>
    );
  }
}
