import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({introduceStore, uiStore}) {
  const filterInterfaceList = () => {
    if (uiStore.uiState.introducePager.index === 1) {
      introduceStore.getAssortmentC2();
    } else {
      uiStore.updateUiStore('introducePager.index', 1);
    }
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      filterInterfaceList();
    }
  };
  const handleChange = (evt) => {
    introduceStore.updateValue('filterInfo.keyword', evt.target.value);
  };
  return (
  <div className={styles.box}>
    <div className={styles.inputs}>
      <Input
        inputType="default"
        className={styles.inputCss}
        onChange={handleChange}
        onKeyUp={handleSearch}
        value={introduceStore.filterInfo.keyword}
        placeholder="输入接口名称进行查询"
        />
      <span className={styles['search-icon']} onClick={filterInterfaceList}></span>
    </div>
  </div>
  );
}
SearchBar.propTypes = {
  introduceStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('introduceStore', 'uiStore')(observer(SearchBar));
