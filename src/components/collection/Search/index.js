import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Search({ collectionStore, uiStore }) {
  const setSearchValue = (evt) => {
    collectionStore.setSearchValue(evt.target.value);
  };

  const searchHandle = () => {
    const collection = uiStore.uiState.collection;
    collectionStore.getCollectionPage({
      companyName: collection.companyName,
      index: 1,
      size: collection.size
    });
  };

  const searchKeyDownHandle = (evt) => {
    if (evt.keyCode === 13) {
      searchHandle();
    }
  };

  return (
    <div className={styles.search}>
      <input type="text"
        placeholder="输入企业名称"
        className={styles.input}
        value={collectionStore.searchValue}
        onKeyDown={searchKeyDownHandle}
        onChange={setSearchValue}/>
      <i className="fa fa-search"></i>
    </div>
  );
}

Search.propTypes = {
  collectionStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default observer(Search);
