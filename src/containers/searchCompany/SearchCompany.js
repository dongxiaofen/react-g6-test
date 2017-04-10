import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SearchBar from 'components/searchCompany/SearchBar';
// import SearchList from 'components/searchCompany/SearchList';

@observer
export default class SearchCompany extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('container');
    return (
      <div>
        <SearchBar />
        {/* <SearchList /> */}
      </div>
    );
  }
}
