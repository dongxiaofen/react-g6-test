import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function SearchList({searchCompanyStore}) {
  const {searchResult} = searchCompanyStore;
  console.log(searchResult.toJS(), '======searchResult');
  return (
    <div className={styles.wrapList}>
      SearchList
    </div>
  );
}

SearchList.propTypes = {
  searchCompanyStore: PropTypes.string,
};
// export default observer(SearchList);
export default inject('searchCompanyStore')(observer(SearchList));
