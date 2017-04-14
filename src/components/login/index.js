import React, { Component, PropTypes } from 'react';
import { observer, inject} from 'mobx-react';
import pathval from 'pathval';

import LoginDefault from './LoginDefault';
import LoginGd from './LoginGd';

@inject('clientStore')
@observer
export default class Login extends Component {
  static propTypes = {
    clientStore: PropTypes.object,
    location: PropTypes.object
  };
  render() {
    if (pathval.getPathValue(this.props.clientStore, 'envConfig') === 'gd_dianxin_prod') {
      return <LoginGd pathname={ this.props.location } />;
    }
    return <LoginDefault />;
  }
}
