import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

@inject('assetTransactionStore')
@observer
export default class TradeTrend extends Component {
  static propTypes = {
    foo: PropTypes.string
  };
  render() {
    return (
      <div className={styles}>
        this is TradeTrend
      </div>
    );
  }
}
