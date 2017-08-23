import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Interface extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
