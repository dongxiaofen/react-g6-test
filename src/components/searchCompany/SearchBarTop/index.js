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
    searchCompanyClick,
    searchTabStatus,
    searchTabMouseDown,
  } = searchCompanyStore;
  return (
    <div className={`${styles.box}`}>
      <SearchTabTop
        searchTabClick={searchTabClick}
        searchTabMouseDown={searchTabMouseDown}
        searchTypeConfig={searchTypeConfig}
        searchType={searchType}
        searchTabStatus={searchTabStatus} />
      <SearchInputTop
        plholderConfig={plholderConfig}
        searchType={searchType}
        searchKey={searchKey}
        searchChange={searchChange}
        handleEnter={handleEnter}
        searchCompanyClick={searchCompanyClick} />
    </div>
  );
}

SearchBarTop.propTypes = {
  searchCompanyStore: PropTypes.object,
};
export default inject('searchCompanyStore')(observer(SearchBarTop));
