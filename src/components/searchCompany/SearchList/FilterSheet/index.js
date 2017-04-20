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
  }) {
  return (
    <div className={styles.wrap}>
      <FilterTotal
        filterSheet={filterSheet}
        page={page}
        searchKeyFilter={searchKeyFilter} />
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
  searchKeyFilter: PropTypes.string,
  filterSingleShow: PropTypes.func,
  filterItemClick: PropTypes.func,
  updateValue: PropTypes.func,
};
export default observer(FilterSheet);
