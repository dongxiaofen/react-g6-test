import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import SwitchData from 'components/bidMarket/SwitchData';

const _from = moment().subtract(29, 'days').format('YYYY-MM-DD');
const _to = moment().format('YYYY-MM-DD');

@inject('bidMarketStore')
@observer
export default class BidMarket extends Component {
  static propTypes = {
    bidMarketStore: PropTypes.object
  }

  componentDidMount() {
    const params = {
      from: _from,
      to: _to,
      province: ''
    };
    const bidMarketStore = this.props.bidMarketStore;
    bidMarketStore.getAll(params);
    bidMarketStore.getInfo(params);
  }

  componentWillUnmount() {
    const params = {
      from: _from,
      to: _to,
      province: '',
      city: '',
    };
    this.props.bidMarketStore.setParams(params);
  }

  render() {
    const bidMarketStore = this.props.bidMarketStore;
    return (
      <Container>
        <Row>
          <Col>
            <h4 className={styles.title}>招投标</h4>
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
      </Container>
    );
  }
}
