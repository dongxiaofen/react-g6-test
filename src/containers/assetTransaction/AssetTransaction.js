import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';

import styles from './index.less';
import { Container } from 'components/common/layout';
import TradeTrend from 'components/assetTransaction/TradeTrend';
import AssetLocal from 'components/assetTransaction/AssetLocal';
import Distribution from 'components/assetTransaction/Distribution';

const TabPane = Tabs.TabPane;

@inject('assetTransactionStore')
@observer
export default class AssetTransaction extends Component {
  static propTypes = {
    assetTransactionStore: PropTypes.object,
  }

  componentWillUnmount() {
    this.props.assetTransactionStore.resetStore();
  }

  render() {
    return (
      <Container>
        <h2 className={styles.title}>资产处置</h2>
        <Tabs defaultActiveKey="1">
          <TabPane tab="本地资产" key="1">
            <AssetLocal />
          </TabPane>
          <TabPane tab="交易趋势" key="2">
            <TradeTrend />
          </TabPane>
          <TabPane tab="地区分布" key="3">
            <Distribution />
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
