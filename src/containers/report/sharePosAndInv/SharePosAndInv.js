import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class SharePosAndInv extends Component {
  render() {
    return (
      <div>
        <div className={styles.title}>股东投资任职</div>
        <div className={styles.content}>
          该功能，暂时尚未开放
        </div>
      </div>
    );
  }
}
