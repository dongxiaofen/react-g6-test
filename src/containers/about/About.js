import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AboutPage from 'components/about';

@observer
export default class About extends Component {
  render() {
    return (
      <AboutPage />
    );
  }
}
