import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';

import CardList from 'components/collection/CardList';
import Search from 'components/collection/Search';

@inject('collectionStore', 'uiStore')
@observer
export default class Collection extends Component {
  static propTypes = {
    collectionStore: PropTypes.object,
    uiStore: PropTypes.object,
  }

  componentDidMount() {
    const collection = this.props.uiStore.uiState.collection;
    this.props.collectionStore.getCollectionPage({
      companyName: '',
      index: 1,
      size: collection.size
    });
  }
  componentWillUnmount() {
    this.props.collectionStore.setSearchValue('');
  }

  render() {
    const collectionStore = this.props.collectionStore;
    const uiStore = this.props.uiStore;
    return (
      <Container>
        <Row>
          <Col>
            <div className="clearfix">
              <h1 className={styles.title}>我的收藏</h1>
              <Search collectionStore={collectionStore}
                uiStore={uiStore} />
            </div>
            <CardList collectionStore={collectionStore}
              uiStore={uiStore}/>
          </Col>
        </Row>
      </Container>
    );
  }
}
