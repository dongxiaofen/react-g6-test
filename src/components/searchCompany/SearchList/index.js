import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchItem from './SearchItem';
// import { Container, Row, Col } from 'components/common/Layout';

function SearchList({searchCompanyStore}) {
  const {searchResult} = searchCompanyStore;
  console.log(searchResult.toJS(), '======searchResult');
  const listData = [];
  searchResult.forEach((itemData) => {
    listData.push(
      <div>
        <SearchItem itemData={itemData} />
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
  searchCompanyStore: PropTypes.string,
};
// export default observer(SearchList);
export default inject('searchCompanyStore')(observer(SearchList));
