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
    filterSingleShow
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
        filterSingleShow={filterSingleShow} />
      <FilterToggle />
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
};
export default observer(FilterSheet);
