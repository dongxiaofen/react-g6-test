import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchNav } from 'components/hoc';
import SafeInfo from 'components/account/safe/safeInfo';
import SafeList from 'components/account/safe/safeList';
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
  }
  render() {
    const data = {
      loading: this.props.accountStore.safe.safeData.data === undefined,
      error: this.props.accountStore.safe.safeData.error
    };
    return (
      <div>
        <SafeInfo data={data}/>
        <SafeList/>
      </div>
    );
  }
}
