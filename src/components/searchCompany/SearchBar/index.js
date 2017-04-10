import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchTab from './SearchTab';
import SearchInput from './SearchInput';

function SearchBar({searchCompanyStore}) {
  const {
    searchTypeConfig,
    plholderConfig,
    searchType,
    searchTabClick,
    searchChange,
    searchKey,
    getCompanyList,
  } = searchCompanyStore;
  return (
    <div className={styles.bar}>
      <SearchTab
        searchTabClick={searchTabClick}
        searchTypeConfig={searchTypeConfig}
        searchType={searchType} />
      <SearchInput
        plholderConfig={plholderConfig}
        searchType={searchType}
        searchKey={searchKey}
        searchChange={searchChange}
        getCompanyList={getCompanyList} />
    </div>
  );
}

SearchBar.propTypes = {
  searchCompanyStore: PropTypes.object,
};

export default inject('searchCompanyStore')(observer(SearchBar));
