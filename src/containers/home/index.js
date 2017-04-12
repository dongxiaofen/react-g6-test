import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import SearchBar from 'components/home/SearchBar';
// import SearchList from 'components/home/SearchList';
@inject('homeStore')
@observer
export default class Home extends Component {
  static propTypes = {
    homeStore: PropTypes.object,
  }
  componentDidMount() {
    this.props.homeStore.postLogin();
  }
  render() {
    return (
      <div>
        123
      </div>
    );
  }
}
