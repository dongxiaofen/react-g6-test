import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import FilterTotal from './FilterTotal';
import FilterContent from './FilterContent';
import FilterToggle from './FilterToggle';

function FilterSheet({filterSheet, page, searchKeyFilter}) {
  return (
    <div className={styles.wrap}>
      <FilterTotal
        filterSheet={filterSheet}
        page={page}
        searchKeyFilter={searchKeyFilter} />
      <FilterContent
        filterSheet={filterSheet} />
      <FilterToggle />
    </div>
  );
}

FilterSheet.propTypes = {
  filterSheet: PropTypes.object,
  page: PropTypes.object,
  searchKeyFilter: PropTypes.string,
};
export default observer(FilterSheet);
