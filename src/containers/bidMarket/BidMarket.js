import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import SwitchData from 'components/bidMarket/SwitchData';
import Area from 'components/bidMarket/Area';
import Info from 'components/bidMarket/Info';
import Trend from 'components/bidMarket/Trend';
import Rank from 'components/bidMarket/Rank';

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
      province: '',
      city: '',
      index: 1,
      size: bidMarketInfo.size
    };
    this.props.bidMarketStore.setParams(params);
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
            <div className={styles.itemBlockBG}>
              <Area />
            </div>
          </div>
          <div className={styles.itemBlock}>
            <div className={styles.itemBlockBG}>
              <Trend />
            </div>
          </div>
          <div className={styles.itemBlock}>
            <div className={styles.itemBlockBG}>
              <Rank />
            </div>
          </div>
        </Row>
        <Info
          params={bidMarketStore.params}
          areaInfo={bidMarketStore.areaInfo}
          infoLoading={bidMarketStore.infoLoading}
          getBidMarketDetail={bidMarketStore.getBidMarketDetail} />
      </Container>
    );
  }
}
