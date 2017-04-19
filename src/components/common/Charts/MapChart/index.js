import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

@observer
export default class MapChart extends Component {
  static propTypes = {
    foo: PropTypes.string
  };
  render() {
    return (
      <div>

      </div>
    );
  }
}
