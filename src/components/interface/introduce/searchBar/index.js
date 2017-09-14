import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({interfaceStore, uiStore}) {
  const filterInterfaceList = () => {
    if (uiStore.uiState.interfacePager.index === 1) {
      interfaceStore.getInterfaceList();
    } else {
      uiStore.updateUiStore('interfacePager.index', 1);
    }
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      filterInterfaceList();
    }
  };
  const handleChange = (evt) => {
    interfaceStore.updateValue('filterInfo.name', evt.target.value);
  };
  return (
  <div className={styles.box}>
    <Input
      inputType="default"
      className={styles.inputCss}
      onChange={handleChange}
      onKeyUp={handleSearch}
      value={interfaceStore.filterInfo.name}
      placeholder="输入接口名称进行查询"
    />
  <span className={styles['search-icon']} onClick={filterInterfaceList}></span>
  </div>
  );
}
SearchBar.propTypes = {
  interfaceStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('interfaceStore', 'uiStore')(observer(SearchBar));
