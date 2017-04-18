import React, { Component, PropTypes } from 'react';
import BaseInfo from './BaseInfo';
import Statistic from './Statistic';
import AlertInfo from './AlertInfo';
import {Col, Row, Container} from 'components/common/layout';

export default class MyHomePageBody extends Component {
  static propTypes = {
    foo: PropTypes.string
  };
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
