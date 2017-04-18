import React, { Component, PropTypes } from 'react';
import BaseInfo from './BaseInfo';
import Statistic from './Statistic';
import AlertInfo from './AlertInfo';
import { inject, observer} from 'mobx-react';
import {Col, Row, Container} from 'components/common/layout';

@inject('myHomePageStore')
@observer
export default class MyHomePageBody extends Component {
  static propTypes = {
    myHomePageStore: PropTypes.object,
  };
  componentWillMount() {
    const pageParams = {
      index: 1,
      size: 10,
    };
    this.props.myHomePageStore.getAlert(pageParams);
  }
  render() {
    return (
      <Container>
        <Row>
          <Col width="8">
            <BaseInfo />
            <AlertInfo />
          </Col>
          <Col width="4">
            <Statistic />
          </Col>
        </Row>
      </Container>
    );
  }
}
