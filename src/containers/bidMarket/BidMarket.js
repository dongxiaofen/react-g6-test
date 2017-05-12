import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import SwitchData from 'components/bidMarket/SwitchData';
import Info from 'components/bidMarket/Info';

const _from = moment().subtract(29, 'days').format('YYYY-MM-DD');
const _to = moment().format('YYYY-MM-DD');

@inject('bidMarketStore', 'uiStore')
@observer
export default class BidMarket extends Component {
  static propTypes = {
    bidMarketStore: PropTypes.object,
    uiStore: PropTypes.object
  }

  componentDidMount() {
    const bidMarketInfo = this.props.uiStore.uiState.bidMarketInfo;
    const params = {
      from: _from,
      to: _to,
      province: ''
    };
    const bidMarketStore = this.props.bidMarketStore;
    bidMarketStore.getAll(params);
    params.index = 1;
    params.size = bidMarketInfo.size;
    bidMarketStore.getInfo(params);
    bidMarketStore.setParams(params);
  }

  componentWillUnmount() {
    this.props.bidMarketStore.resetStore();
  }

  render() {
    const bidMarketStore = this.props.bidMarketStore;
    return (
      <Container>
        <Row>
          <Col>
            <h2 className={styles.title}>招投标</h2>
            <SwitchData
              from={_from}
              to={_to}
              params={bidMarketStore.params}
              setParams={bidMarketStore.setParams}/>
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
        <Info
          params={bidMarketStore.params}
          areaInfo={bidMarketStore.areaInfo}
          infoLoading={bidMarketStore.infoLoading} />
      </Container>
    );
  }
}
