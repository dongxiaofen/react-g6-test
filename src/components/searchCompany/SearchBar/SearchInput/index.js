import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SearchInput({
  plholderConfig,
  searchType,
  searchKey,
  searchChange,
  getCompanyList}) {
  const placeholderText = plholderConfig[searchType];
  console.log(searchChange);
  return (
    <div className={styles.searchInputWrap}>
      <input onChange={searchChange} placeholder={placeholderText} value={searchKey} />
      <button onClick={getCompanyList}>搜索</button>
    </div>
  );
}

SearchInput.propTypes = {
  plholderConfig: PropTypes.object,
  searchType: PropTypes.string,
  searchKey: PropTypes.string,
  searchChange: PropTypes.func,
  getCompanyList: PropTypes.func,
};
export default observer(SearchInput);
