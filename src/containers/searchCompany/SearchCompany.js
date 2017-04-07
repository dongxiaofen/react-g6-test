import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SearchList from 'components/home/SearchList';

@observer
export default class SearchCompany extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const {searchResult} = {searchCompanyStore};
    // console.log(searchResult);
    return (
      <div>
        <SearchList />
        SearchCompany test
      </div>
    );
  }
}
