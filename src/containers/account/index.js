import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import TreeList from 'components/account/TreeList';
import UserInfo from 'components/account/UserInfo';
import TabList from 'components/account/TabList';
@observer
export default class Account extends Component {
  render() {
    return (
      <Container>
        <TreeList />
        <UserInfo />
        <TabList />
      </Container>
    );
  }
}
