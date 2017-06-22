import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import SearchBar from 'components/searchCompany/SearchBar';
import { Container} from 'components/common/layout';
import styles from './index.less';
@inject('searchStore')
@observer
export default class Search extends Component {
  static propTypes = {
    searchStore: PropTypes.object,
  }
  componentWillUnmount() {
    this.props.searchStore.resetData();
  }
  render() {
    let searchBarDom = '';
    searchBarDom = (
      <div className={`${styles.searchBarWrap} ${styles.bdWhite}`}>
        <Container>
          <div className={`${styles.searchBarCon}`}>
            <SearchBar />
          </div>
        </Container>
      </div>
    );
    return (
      <div className={`${styles.searchWrap}`}>
        {searchBarDom}
      </div>
    );
  }
}
