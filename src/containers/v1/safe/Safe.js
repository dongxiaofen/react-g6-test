import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchNav } from 'components/hoc';
import SafeInfo from 'components/v1/safe/safeInfo';
import TabList from 'components/v1/safe/tabList';
import MainContBox from 'components/common/MainContBox';
@batchNav()
@inject('accountStore')
@observer
export default class Safe extends Component {
  static propTypes = {
    accountStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.accountStore.getApiKey();
    this.props.accountStore.getResetApiList();
    this.props.accountStore.getWhiteList();
  }
  render() {
    const data = {
      loading: this.props.accountStore.safe.safeData.data === undefined,
      error: this.props.accountStore.safe.safeData.error
    };
    return (
      <MainContBox>
        <SafeInfo data={data}/>
        <TabList/>
      </MainContBox>
    );
  }
}
