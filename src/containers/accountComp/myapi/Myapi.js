import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import MyapiMain from 'components/account/myapi';

@inject('accountStore')
@observer
export default class MyApi extends Component {
  static propTypes = {
    accountStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.accountStore.getMyInterface();
    this.props.accountStore.getInterfaceType();
  }
  render() {
    return (
      <div>
        <MyapiMain data={{loading: this.props.accountStore.myApi.myInterface.data === undefined, error: this.props.accountStore.myApi.myInterface.error}}/>
      </div>
    );
  }
}
