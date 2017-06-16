import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchTab from './SearchTab';
import SearchInput from './SearchInput';
import History from './History';

function SearchBar({searchStore}) {
  const {
    searchTypeConfig,
    plholderConfig,
    searchType,
    searchTabClick,
    searchChange,
    searchKey,
    handleEnter,
    searchCompanyClick,
    getHistory,
    historyResult,
    historyClick,
  } = searchStore;
  // SearchTab 为搜索选择类型  SearchInput 为搜索框和按钮  History 为历史记录
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
        handleEnter={handleEnter}
        searchCompanyClick={searchCompanyClick} />
      <History
        getHistory={getHistory}
        historyClick={historyClick}
        historyResult={historyResult} />
    </div>
  );
}

SearchBar.propTypes = {
  searchStore: PropTypes.object,
};

export default inject('searchStore')(observer(SearchBar));
