import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FilterToggle({updateValue, filterSheet}) {
  const status = filterSheet.filterSheetStatus;
  return (
    <div className={`${styles.wrap}`}>
      <div
        onClick={updateValue.bind(this, 'filterSheetStatus', !status)}
        className={`${styles.toggleFilter}`}>
        <a>{status ? '打开筛选' : '收起筛选'}</a>
        <span className={`${styles.toggleFilterImg}`}>
          <i></i>
        </span>
      </div>
    </div>
  );
}

FilterToggle.propTypes = {
  updateValue: PropTypes.func,
  filterSheet: PropTypes.object,
};
export default observer(FilterToggle);
