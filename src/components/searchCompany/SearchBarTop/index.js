import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchTabTop from './SearchTabTop';
import SearchInputTop from './SearchInputTop';

function SearchBarTop({searchCompanyStore}) {
  const {
    searchTabClick,
    searchTypeConfig,
    searchType,
    plholderConfig,
    searchKey,
    searchChange,
    handleEnter,
    getCompanyList,
  } = searchCompanyStore;
  return (
    <div className={`${styles.box}`}>
      <SearchTabTop
        searchTabClick={searchTabClick}
        searchTypeConfig={searchTypeConfig}
        searchType={searchType} />
      <SearchInputTop
        plholderConfig={plholderConfig}
        searchType={searchType}
        searchKey={searchKey}
        searchChange={searchChange}
        handleEnter={handleEnter}
        getCompanyList={getCompanyList} />
    </div>
  );
}

SearchBarTop.propTypes = {
  searchCompanyStore: PropTypes.object,
};
export default inject('searchCompanyStore')(observer(SearchBarTop));
