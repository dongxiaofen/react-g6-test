import React, { Component } from 'react';
import { Container, Row, Col } from 'components/common/Layout';
import Title from 'components/accountSetting/Title';
import AccountTree from 'components/accountSetting/AccountTree';
import AccountBase from 'components/accountSetting/AccountBase';
import AccountTabs from 'components/accountSetting/AccountTabs';
export default class AccountSetting extends Component {
  render() {
    return (
      <Container>
        <Title>账号设置</Title>
        <Row>
          <Col width="3">
            <AccountTree {...this.props} />
          </Col>
          <Col width="9">
            <AccountBase {...this.props} />
            <AccountTabs {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}
