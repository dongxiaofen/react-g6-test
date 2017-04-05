import React from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import SearchItem from './SearchItem';
// import LoginStatus from './LoginStatus';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import styles from './index.less';
import {loadingWrap} from 'components/hoc';

function SearchList({searchStore, relationStore}) {
  const {searchRes} = searchStore;
  const showDetail = (monitorId, company) => {
    // const monitorId = searchStore.searchRes[searchStore.searchRes.findIndex(com => com.company === evt.target.innerHTML)].monitorId;
    runInAction('设置网络图初始化数据', () => {
      relationStore.monitorId = monitorId;
      relationStore.mainCompany = company;
      // this.props.searchStore.searchRes[0].company = 'test';
      // extendObservable(this.props.searchStore.searchRes[0], {
      //   wyd: 'wyd'
      // });
    });
    relationStore.getRelation();
  };
  return (
    <div className={styles.searchList}>
      <Row gutter={16}>
        {searchRes.map((item, idx) => <Col key={idx} span={8}><SearchItem showDetail={showDetail} item={item} /></Col> )}
      </Row>
    </div>
  );
}

export default inject('searchStore', 'relationStore')(loadingWrap({
  mapDataToProps: props=> ({loading: props.searchStore.loading})
})(observer(SearchList)));
// <LoginStatus isLogin={homeStore.isLogin} />
