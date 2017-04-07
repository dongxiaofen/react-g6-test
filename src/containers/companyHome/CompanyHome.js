import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Banner from 'components/companyHome/Banner';
@observer
export default class CompanyHome extends Component {
  static propTypes = {
    location: PropTypes.object,
  };
  render() {
    return (
      <div>
        <Banner location={this.props.location}/>
      </div>
    );
  }
}
