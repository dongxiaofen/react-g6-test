import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SearchInputTop({
  plholderConfig,
  searchType,
  searchKey,
  searchChange,
  handleEnter,
  searchCompanyClick}) {
  const placeholderText = plholderConfig[searchType];
  return (
    <div className={styles.searchInputWrap}>
      <input
        onChange={searchChange}
        onKeyUp={handleEnter}
        placeholder={placeholderText}
        value={searchKey}
        className={styles.searchInput} />
      <button
        onClick={searchCompanyClick}
        className={styles.searchButton}>搜索</button>
    </div>
  );
}

SearchInputTop.propTypes = {
  plholderConfig: PropTypes.object,
  searchType: PropTypes.string,
  searchKey: PropTypes.string,
  searchChange: PropTypes.func,
  searchCompanyClick: PropTypes.func,
  handleEnter: PropTypes.func,
};
export default observer(SearchInputTop);
