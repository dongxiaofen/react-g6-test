import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Row, Col } from 'components/common/layout';
import Title from 'components/accountSetting/Title';
import AccountTree from 'components/accountSetting/AccountTree';
import AccountBase from 'components/accountSetting/AccountBase';
import AccountTabs from 'components/accountSetting/AccountTabs';
@inject('accountSettingStore')
@observer
export default class AccountSetting extends Component {
  static propTypes = {
    accountSettingStore: PropTypes.object,
  }
  componentDidMount() {
    this.props.accountSettingStore.getTreeList();
  }
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
