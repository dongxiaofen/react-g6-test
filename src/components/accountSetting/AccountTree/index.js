import React from 'react';
import { observer } from 'mobx-react';
import AddUser from './AddUser';
import SearchBar from './SearchBar';
import TreeList from './TreeList';
import styles from './index.less';
function AccountTree(props) {
  return (
    <div className={styles.wrapper}>
      <AddUser {...props} />
      <SearchBar {...props} />
      <TreeList {...props} />
    </div>
  );
}
export default observer(AccountTree);
