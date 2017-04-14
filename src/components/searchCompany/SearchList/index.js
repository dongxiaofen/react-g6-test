import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchItem from './SearchItem';
// import { Container, Row, Col } from 'components/common/Layout';

function SearchList({searchCompanyStore}) {
  const {searchResult, searchParameter} = searchCompanyStore;
  console.log(searchResult.toJS(), searchParameter, '======searchResult');
  const listData = [];
  searchResult.map((itemData, idx) => {
    listData.push(
      <div key={`${itemData.regDate}${idx}`}>
        <SearchItem
          itemData={itemData}
          searchParameter={searchParameter} />
      </div>
    );
  });
  return (
    <div className={`${styles.wrapList}`}>
      <div className={`${styles.listDataWrap}`}>
        {listData}
      </div>
    </div>
  );
}

SearchList.propTypes = {
  searchCompanyStore: PropTypes.object,
};
// export default observer(SearchList);
export default inject('searchCompanyStore')(observer(SearchList));
