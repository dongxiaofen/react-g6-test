import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchNav } from 'components/hoc';
import SafeCont from 'components/account/safe';
@batchNav()
@inject('accountStore')
@observer
export default class Safe extends Component {
  static propTypes = {
    accountStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.accountStore.getApiKey();
  }
  render() {
    const data = {
      loading: this.props.accountStore.safe.safeData.data === undefined,
      error: this.props.accountStore.safe.safeData.error
    };
    return (
      <div>
        <SafeCont data={data}/>
      </div>
    );
  }
}
