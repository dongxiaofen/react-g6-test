import React from 'react';
import { observer } from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({accountSettingStore}) {
  const inputChange = (evt) => {
    accountSettingStore.changeValue('tree.searchInput', evt.target.value);
    accountSettingStore.changeValue('tree.activeIndex', -1);
  };
  return (
    <Input
      inputType="singleline"
      className={styles.inputCss}
      onChange={inputChange}
      value={accountSettingStore.tree.searchInput}
      placeholder="按姓名或账号查找" />
  );
}

export default observer(SearchBar);
