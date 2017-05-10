import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import {runInAction} from 'mobx';
import styles from './index.less';
import TypeList from './TypeList';
import FormItem from 'components/lib/FormItem';
import Input from 'components/lib/input';

function CircleTypeList({ networkStore, messageStore }) {
  const handleSearchChange = (evt) => {
    runInAction('searching network', ()=>{
      networkStore.searchKey = evt.target.value;
    });
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      const searchKey = networkStore.searchKey;
      const nodesData = networkStore.currentNetwork.nodes;
      let searchNull = true;
      nodesData.map((node) => {
        if (searchKey !== '' && node.name === searchKey && node.category !== 0) {
          searchNull = false;
        }
      });
      if (searchNull) {
        messageStore.openMessage({type: 'info', content: '搜索无结果', duration: 1000});
      }else {
        networkStore.focusNode(networkStore.searchKey);
      }
    }
  };
  return (
    <div className={styles.box}>
      <div className={styles.searchBox}>
        <FormItem
          labelCol="0"
          wrapperCol="1">
          <Input
            id="search"
            type="text"
            placeholder="请输入公司名或人名，回车查找"
            value={networkStore.searchKey}
            onChange={handleSearchChange}
            onKeyUp={handleSearch}
            className={styles.searchInput}
            autoComplete={false} />
          <i className={`fa fa-search ${styles.searchIcon}`} aria-hidden="true"></i>
        </FormItem>
      </div>
      <TypeList typeList={networkStore.typeList} toggleChecked={networkStore.toggleChecked} toggleCheckAll={networkStore.toggleCheckAll} />
    </div>
  );
}

CircleTypeList.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore', 'messageStore')(observer(CircleTypeList));
