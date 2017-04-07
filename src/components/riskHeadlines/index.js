import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import RiskFilter from './RiskFilter';
@inject('riskHeadlinesStore')
@observer
export default class RiskMain extends Component {
  static propTypes = {
    riskHeadlinesStore: PropTypes.object,
  }
  render() {
    console.log(this, this.props.riskHeadlinesStore.filterParams);
    return (
      <div>
        <RiskFilter riskHeadlinesStore={this.props.riskHeadlinesStore}/>
      </div>
    );
  }
}
