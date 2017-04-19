import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchItem from './SearchItem';
import FilterSheet from './FilterSheet';
// import { Container, Row, Col } from 'components/common/Layout';

function SearchList({searchCompanyStore}) {
  const {
    searchResult,
    searchParameter,
    isShowResult,
    filterSheet,
    filterArray,
    filterArrayStatus,
    page,
    searchKeyFilter,
    filterSingleShow,
    filterItemClick,
    updateValue,
  } = searchCompanyStore;
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
  let result = '';
  if (isShowResult) {
    if (searchResult.length > 0) {
      result = (
        <div className={`${styles.wrapList}`}>
          <FilterSheet
            filterSheet={filterSheet}
            filterArray={filterArray}
            filterArrayStatus={filterArrayStatus}
            filterSingleShow={filterSingleShow}
            filterItemClick={filterItemClick}
            page={page}
            searchKeyFilter={searchKeyFilter}
            updateValue={updateValue} />
          <div className={`${styles.listDataWrap}`}>
            {listData}
          </div>
        </div>
      );
    } else {
      result = (<div>没有找到相关公司</div>);
    }
  } else {
    result = <span></span>;
  }
  return (
    result
  );
}

SearchList.propTypes = {
  searchCompanyStore: PropTypes.object,
};
export default inject('searchCompanyStore')(observer(SearchList));
