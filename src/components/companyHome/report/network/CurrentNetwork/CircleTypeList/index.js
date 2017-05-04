import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import {runInAction} from 'mobx';
import styles from './index.less';
import TypeList from './TypeList';
import FormItem from 'components/lib/FormItem';
import Input from 'components/lib/input';

function CircleTypeList({ networkStore }) {
  const handleSearchChange = (evt) => {
    runInAction('searching network', ()=>{
      networkStore.searchKey = evt.target.value;
    });
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      console.log(networkStore.searchKey);
      networkStore.focusNode(networkStore.searchKey);
      // const searchName = this.props.currentNetwork.get('searchKey');
      // const nodesData = this.props.currentNetwork.get('currentNetwork').toJS().nodes;
      // let searchNull = true;
      // nodesData.map((node) => {
      //   if (searchName !== '' && node.name.indexOf(searchName) >= 0 && node.category !== 0) {
      //     searchNull = false;
      //   }
      // });
      // if (searchNull) {
      //   this.props.commonBoundAC.updateValue(['agreeModal', 'msgModal'], {
      //     show: true,
      //     msg: '搜索无结果'
      //   }, 'NETWORK_UPDATE_VALUE');
      // } else {
      //   const nodeArr = Array.from(document.getElementsByClassName('ExpandNode'));
      //   nodeArr.map((node) => {
      //     node.className = `ExpandNode ${styles.nodeName}`;
      //   });
      //   this.props.networkBoundAC.searchNetwork(searchName);
      // }
    }
  };
  return (
    <div className={styles.box}>
      <div className={styles.searchBox}>
        <FormItem
          labelCol="0"
          wrapperCol="1">
          <i className={`fa fa-search ${styles.searchIcon}`} aria-hidden="true"></i>
          <Input
            id="search"
            type="text"
            placeholder="请输入公司名或人名，回车查找"
            value={networkStore.searchKey}
            onChange={handleSearchChange}
            onKeyUp={handleSearch}
            className={styles.searchInput}
            autoComplete={false} />
        </FormItem>
      </div>
      <TypeList />
    </div>
  );
}

CircleTypeList.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore')(observer(CircleTypeList));
