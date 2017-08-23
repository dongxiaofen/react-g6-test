import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import MainContBox from 'components/common/MainContBox';

@observer
export default class Account extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    return (
      <MainContBox>
        {this.props.children}
      </MainContBox>
    );
  }
}
