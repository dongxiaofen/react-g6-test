import React, { Component, PropTypes } from 'react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import {Col, Row, Container} from 'components/common/layout';
import styles from './index.less';

export default class InLoanAnalysisBody extends Component {
  static propTypes = {
    accountProfileStore: PropTypes.object,
  };

  render() {
    return (
      <div> body </div>
    );
  }
}
