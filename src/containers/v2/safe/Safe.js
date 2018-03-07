import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchNav } from 'components/hoc';
import SafeInfo from 'components/v2/safe/safeInfo';
import TabList from 'components/v2/safe/tabList';
import MainContBox from 'components/common/MainContBox';
@batchNav()
@inject('safeStore')
@observer
export default class Safe extends Component {
  static propTypes = {
    safeStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.safeStore.getApiKey();
    this.props.safeStore.getResetApiList();
    this.props.safeStore.getWhiteList();
  }
  render() {
    const data = {
      loading: this.props.safeStore.safeData.data === undefined,
      error: this.props.safeStore.safeData.error
    };
    return (
      <MainContBox>
        <SafeInfo data={data}/>
        <TabList/>
      </MainContBox>
    );
  }
}
