import React from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({interfaceStore}) {
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      interfaceStore.getInterfaceList();
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
  <span className={styles['search-icon']} onClick={interfaceStore.getInterfaceList}></span>
  </div>
  );
}
export default inject('interfaceStore')(observer(SearchBar));
