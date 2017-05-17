import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Tabs from 'antd/lib/tabs';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import TradeTrend from 'components/assetTransaction/TradeTrend';

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
          <Tabs defaultActiveKey="2">
            <TabPane tab="本地资产" key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab="交易趋势" key="2">
              <TradeTrend />
            </TabPane>
            <TabPane tab="地区分布" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Row>
      </Container>
    );
  }
}
