import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Tabs from 'antd/lib/tabs';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import TradeTrend from 'components/assetTransaction/TradeTrend';
import AssetLocal from 'components/assetTransaction/AssetLocal';
import Distribution from 'components/assetTransaction/Distribution';

const TabPane = Tabs.TabPane;

@observer
export default class AssetTransaction extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2 className={styles.title}>资产交易</h2>
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Container>
    );
  }
}
