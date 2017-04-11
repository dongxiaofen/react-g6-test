import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Banner from 'components/companyHome/Banner';
import Report from 'components/companyHome/Report';

@observer
export default class CompanyHome extends Component {
  static propTypes = {
    location: PropTypes.object,
  };
  render() {
    return (
      <div>
        <Banner location={this.props.location}/>
        <Report location={this.props.location}/>
      </div>
    );
  }
}
