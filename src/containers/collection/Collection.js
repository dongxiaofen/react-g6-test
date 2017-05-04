import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';

import CardList from 'components/collection/CardList';

@inject('collectionStore')
@observer
export default class Collection extends Component {
  static propTypes = {
    collectionStore: PropTypes.object,
  }

  componentDidMount() {
    this.props.collectionStore.getCollectionPage();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="clearfix">
              <h1 className={styles.title}>我的收藏</h1>
            </div>
            <CardList collectionStore={this.props.collectionStore} />
          </Col>
        </Row>
      </Container>
    );
  }
}
