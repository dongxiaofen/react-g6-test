import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Main from './HomeMain';

// let TweenMax;

// @inject('clientStore')
@observer

export default class HomeBody extends Component {
  static propTypes = {
    clientStore: PropTypes.object
  }
  constructor(props) {
    super(props);
    // this.state = {
    //   isHeaderScroll: '',
    // };
  }

  render() {
    return (
      <Main />
    );
  }
}
