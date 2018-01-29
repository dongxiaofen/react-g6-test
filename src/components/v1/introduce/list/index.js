import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import appliedPic from 'imgs/interface/apply.png';
import noPic from 'imgs/noData/noimg.jpg';

import styles from './index.less';

function InterfaceList({interfaceStore, modalStore, routing}) {
  const gotoDetail = (id) => {
    // console.log(id);
    routing.push({
      pathname: '/interface/detail',
      query: {id: id}
    });
  };
  const applyApi = () => {
    modalStore.openCompModal({
      isSingleBtn: true,
      // title: '登录超时',
      contentText: '您未开通该接口，请联系商务人员，我们会立即为你办理，联系电话：400-139-1819，邮箱：info@socialcredits.cn',
      confirmAction: modalStore.closeAction
      // cancelAction: closeAction
    });
  };
  const gotoTest = (id) => {
    routing.push({
      pathname: '/interface/test',
      query: {id: id}
    });
  };
  const isApply = (apiId, key) => {
    // console.log(id);
    let isMyApply = false;
    if (interfaceStore.myInterface[key]) {
      const idx = interfaceStore.myInterface[key].findIndex(({id}) => id === apiId);
      if (idx !== -1) {
        isMyApply = true;
      }
    }
    return isMyApply;
  };
  const createList = () => {
    const interfaceData = interfaceStore.interfaceList.content;
    return interfaceData.map((item, idx) => {
      return (
        <li key={idx} className={`${styles['interface-li']} ${(idx + 1) % 5 === 0 ? styles.noMg : ''}`}>
          {
            isApply(item.id, item.permissionClassification) ?
            <div className={styles.appled}>
              <img src={appliedPic} alt=""/>
              <span>已申请</span>
            </div> : null
          }
          <div className={styles['top-cont']} onClick={gotoDetail.bind(this, item.id)}>
            <div className={styles.imgs}><img src={item.imageData ? item.imageData : noPic} /></div>
            <div className={styles.name}><a onClick={gotoDetail.bind(this, item.id)} title={item.name}>{item.name}</a></div>
            <p className={styles.discript} title={item.description}>{item.keyword ? item.keyword : item.description}</p>
          </div>
          <div className={styles.feeType}>
            <span className={styles['type-tm']}>资费：计次</span>
            <span className={styles['type-tm']} title={interfaceStore.interfaceType.data ? interfaceStore.interfaceType.data[item.permissionClassification] : ''}>分类：{interfaceStore.interfaceType.data ? interfaceStore.interfaceType.data[item.permissionClassification] : ''}</span>
          </div>
          <div className={styles.action}>{isApply(item.id, item.permissionClassification) ? <span onClick={gotoTest.bind(this, item.id)}>测试接口</span> : <span onClick={applyApi}>立即申请</span>}</div>
        </li>
      );
    });
  };
  return (
    <div className={styles.interface}>
      <ul className="clearfix">
        {createList()}
      </ul>
      <Pager module="interfacePager" />
    </div>
  );
}

InterfaceList.propTypes = {
  interfaceStore: PropTypes.object,
  modalStore: PropTypes.object,
  routing: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('interfaceStore', 'modalStore', 'routing')(observer(InterfaceList)));
