import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Alert from 'antd/lib/alert';

@inject('alertStore')
@observer
export default class MyAlert extends Component {
  static propTypes = {
    alertStore: PropTypes.object,
  };
  render() {
    const {show, type, message, closeFunc} = this.props.alertStore;
    return (
      <div>
        {
          show ? <Alert width="200" message={message} type={type} showIcon closable onClose={closeFunc}/> : ''
        }
      </div>
    );
  }
}

