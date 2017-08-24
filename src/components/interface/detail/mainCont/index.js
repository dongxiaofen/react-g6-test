import React from 'react';
import {observer, inject} from 'mobx-react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import InterfaceFile from './file';
import InterfaceError from './error';
// import Input from 'components/lib/input';
import styles from './index.less';
function MainBody({interfaceDetailStore}) {
  // console.log(interfaceDetailStore);
  const fileData = {
    loading: interfaceDetailStore.interfaceDoc.data === undefined,
    error: interfaceDetailStore.interfaceDoc.error
  };
  const errData = {
    loading: interfaceDetailStore.errorDoc.data === undefined,
    error: interfaceDetailStore.errorDoc.error
  };
  return (
    <div className={styles['main-cont']}>
      <Tabs defaultActiveKey="file">
        <TabPane tab="接口文档" key="file">
          <div className={styles['tab-cont']}>
            <InterfaceFile data={fileData}/>
          </div>
        </TabPane>
        <TabPane tab="资费说明" key="cost">
          <div className={styles['tab-cont']}>资费说明－－待完善</div>
        </TabPane>
        <TabPane tab="错误码" key="error">
          <div className={styles['tab-cont']}>
            <InterfaceError data={errData}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
export default inject('interfaceDetailStore')(observer(MainBody));
