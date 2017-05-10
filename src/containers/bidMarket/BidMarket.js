import React, { Component } from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import SwitchData from 'components/bidMarket/SwitchData';

@observer
export default class BidMarket extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h4 className={styles.title}>招投标</h4>
            <SwitchData />
          </Col>
        </Row>
        <Row>
          <div className={styles.itemBlock}>
            this is BidMarket
          </div>
          <div className={styles.itemBlock}>
            this is BidMarket
          </div>
          <div className={styles.itemBlock}>
            this is BidMarket
          </div>
        </Row>
      </Container>
    );
  }
}
