import React from 'react';
import { observer } from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({monitorListStore}) {
  const searchInput = monitorListStore.searchInput;
  const inputChange = (evt) => {
    monitorListStore.changeValue('searchInput', evt.target.value);
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      monitorListStore.changeParams({
        companyName: evt.target.value,
        index: 1,
      });
      monitorListStore.getMainCount();
      monitorListStore.getMainList();
    }
  };
  return (
    <Input
      inputType="singleline"
      className={styles.inputCss}
      onChange={inputChange}
      onKeyUp={handleSearch}
      value={searchInput}
      placeholder="输入主体/关联企业名"
      />
  );
}
export default observer(SearchBar);
