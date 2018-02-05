import React from 'react';
import {observer, inject} from 'mobx-react';
// import { loadingComp } from 'components/hoc';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import SafeList from './safeList';
import WhiteList from './whiteList';
import AddWhite from './addWhite';
import styles from './index.less';

function TabList({accountStore}) {
  const listData = {
    loading: accountStore.safe.resetList.result.data === undefined,
    error: accountStore.safe.resetList.result.error
  };
  const whiteData = {
    loading: accountStore.safe.whiteList.result.data === undefined,
    error: accountStore.safe.whiteList.result.error
  };
  return (
    <div className={styles.safeList}>
      <Tabs defaultActiveKey="white">
        <TabPane tab="白名单管理" key="white">
          <AddWhite />
          <WhiteList data={whiteData}/>
        </TabPane>
        <TabPane tab="密钥重置记录" key="safe">
          <SafeList data={listData} />
        </TabPane>
      </Tabs>
      {/*<h3 className={styles.title}>密钥重置记录</h3>
      <List data={listData} />*/}
    </div>
  );
}

export default inject('accountStore')(observer(TabList));
