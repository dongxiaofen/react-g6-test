import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import FilterTotal from './FilterTotal';
import FilterContent from './FilterContent';
import FilterToggle from './FilterToggle';

function FilterSheet({
    filterSheet,
    filterArray,
    filterArrayStatus,
    page,
    searchKeyFilter,
    filterSingleShow,
    filterItemClick,
    updateValue,
    searchResult,
    modalStore,
    getFeedBack,
  }) {
  let type = '';
  if (filterSheet && filterSheet.filterStatus) {
    Object.keys(filterSheet.filterStatus).map((key)=>{
      if (filterSheet.filterStatus && filterSheet.filterStatus[key] && filterSheet.filterStatus[key].length > 0) {
        type = 'filter';
      }
    });
  }
  // 判断是否开始时就是无数据
  if (type !== 'filter' && searchResult === undefined) {
    return (
      <div className={styles.wrap}>
        <FilterTotal
          modalStore={modalStore}
          filterSheet={filterSheet}
          page={page}
          searchKeyFilter={searchKeyFilter}
          getFeedBack={getFeedBack} />
      </div>
    );
  }
  return (
    <div className={styles.wrap}>
      <FilterTotal
        modalStore={modalStore}
        filterSheet={filterSheet}
        page={page}
        searchKeyFilter={searchKeyFilter}
        getFeedBack={getFeedBack} />
      <FilterContent
        filterSheet={filterSheet}
        filterArray={filterArray}
        filterArrayStatus={filterArrayStatus}
        filterSingleShow={filterSingleShow}
        filterItemClick={filterItemClick} />
      <FilterToggle
        filterSheet={filterSheet}
        updateValue={updateValue} />
    </div>
  );
}

FilterSheet.propTypes = {
  filterSheet: PropTypes.object,
  filterArray: PropTypes.object,
  filterArrayStatus: PropTypes.object,
  page: PropTypes.object,
  searchResult: PropTypes.object,
  modalStore: PropTypes.object,
  searchKeyFilter: PropTypes.string,
  filterSingleShow: PropTypes.func,
  filterItemClick: PropTypes.func,
  updateValue: PropTypes.func,
  getFeedBack: PropTypes.func,
};
export default observer(FilterSheet);
