import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import SearchItem from './SearchItem';
import FilterSheet from './FilterSheet';
import Pagination from 'components/lib/pagination';
// import { Container, Row, Col } from 'components/common/Layout';

function SearchList({searchCompanyStore, modalStore, payModalStore}) {
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
    singleData,
    createMonitor,
    pageParams,
    getPageList,
    getFeedBack,
  } = searchCompanyStore;
  const listData = [];
  searchResult.map((itemData, idx) => {
    listData.push(
      <div key={`${itemData.regDate}${idx}`}>
        <SearchItem
          payModalStore={payModalStore}
          modalStore={modalStore}
          itemData={itemData}
          searchParameter={searchParameter}
          singleData={singleData}
          createMonitor={createMonitor} />
      </div>
    );
  });
  console.log(modalStore, '======modalStore aaa');
  const pageClick = (newPage) => {
    getPageList(newPage);
  };
  let result = '';
  if (isShowResult) {
    if (searchResult.length > 0) {
      console.log(111111);
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
            updateValue={updateValue}
            searchResult={searchResult}
            modalStore={modalStore}
            getFeedBack={getFeedBack} />
          <div className={`${styles.listDataWrap}`}>
            {listData}
          </div>
          <div className={`${styles.pageWrap}`}>
            <Pagination
              current={pageParams.index}
              pageSize={pageParams.size}
              total={page.totalElements}
              onChange={pageClick} />
          </div>
        </div>
      );
    } else {
      console.log(222222);
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
          <div className={`${styles.noCompany}`}>没有找到相关公司</div>
        </div>
      );
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
  modalStore: PropTypes.object,
  payModalStore: PropTypes.object,
};
export default inject('searchCompanyStore', 'modalStore', 'payModalStore')(observer(SearchList));
