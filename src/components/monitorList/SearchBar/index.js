import React from 'react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar() {
  return (
    <Input
      inputType="singleline"
      className={styles.inputCss}
      placeholder="dddd" />
  );
}
export default SearchBar;
