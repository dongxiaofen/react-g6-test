import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Chart from 'components/relation/Chart';

@observer
export default class Relation extends Component {
  render() {
    return (
      <Chart />
    );
  }
}
