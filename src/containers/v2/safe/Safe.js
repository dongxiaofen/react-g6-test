import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchNav } from 'components/hoc';
import SafeInfo from 'components/v2/safe/safeInfo';
import SafeList from 'components/v2/safe/safeList';
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
  }
  render() {
    const data = {
      loading: this.props.safeStore.safeData.data === undefined,
      error: this.props.safeStore.safeData.error
    };
    return (
      <MainContBox>
        <SafeInfo data={data}/>
        <SafeList/>
      </MainContBox>
    );
  }
}
