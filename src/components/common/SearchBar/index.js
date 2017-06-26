import React from 'react';
import {observer} from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({handleChange, handleSearch, inputValue}) {
  return (
  <div className={styles.box}>
    <Input
      inputType="singleline"
      className={styles.inputCss}
      onChange={handleChange}
      onKeyUp={handleSearch}
      value={inputValue}
      placeholder="输入主体/关联企业名"
    />
  </div>
  );
}
export default observer(SearchBar);
