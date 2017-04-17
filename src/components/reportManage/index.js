import React, { Component, PropTypes } from 'react';
import {Container, Row, Col} from 'components/common/Layout';
import TableList from './TableList';

export default class ReportMain extends Component {
  static propTypes = {
    foo: PropTypes.string
  };
  render() {
    return (
      <Container>
        <Row>
          <Col width="12">
            <TableList/>
          </Col>
        </Row>
      </Container>
    );
  }
}
