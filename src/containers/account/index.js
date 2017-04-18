import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Row, Col } from 'components/common/layout';
import TreeList from 'components/account/TreeList';
import UserInfo from 'components/account/UserInfo';
import TabList from 'components/account/TabList';
@observer
export default class Account extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col width="3">
            <TreeList />
          </Col>
          <Col width="9">
            <UserInfo />
            <TabList />
          </Col>
        </Row>
      </Container>
    );
  }
}
