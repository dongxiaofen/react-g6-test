import React, { Component } from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';

import CardList from 'components/collection/CardList';

@observer
export default class Collection extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="clearfix">
              <h1 className={styles.title}>我的收藏</h1>
            </div>
            <CardList />
          </Col>
        </Row>
      </Container>
    );
  }
}
