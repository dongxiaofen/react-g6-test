import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Button from 'components/lib/button';
import styles from './index.less';

function InterfaceInfo({interfaceDetailStore, modalStore, routing}) {
  const infoData = interfaceDetailStore.interfaceInfo.data;
  const interfaceType = interfaceDetailStore.interfaceType[infoData.permissionClassification] ? interfaceDetailStore.interfaceType[infoData.permissionClassification] : '';
  const judgeType = () => {
    let isMyInterface = false;
    const permissionClassification = infoData.permissionClassification;
    const id = infoData.id;
    const myInterface = interfaceDetailStore.myInterface;
    if (myInterface[permissionClassification]) {
      const idx = myInterface[permissionClassification].findIndex(item => item.id === id);
      // console.log(idx, 'idx');
      // console.log(myInterface[permissionClassification][idx].id);
      // console.log(id);
      if (idx !== -1) {
        isMyInterface = true;
      }
    }
    return isMyInterface;
  };
  const gotoTest = () => {
    // console.log('ddd');
    routing.push({
      pathname: '/interface/test',
      query: {id: infoData.id}
    });
  };
  const handleApply = () => {
    // const contentText = <div><p>您未开通该接口，请联系商务人员，我们会立即为你办理</p><p>电话：400-139-1819，邮箱：info@socialcredits.cn</p></div>;
    modalStore.openCompModal({
      isSingleBtn: true,
      // title: '登录超时',
      contentText: '您未开通该接口，请联系商务人员，我们会立即为你办理,联系电话：400-139-1819，邮箱：info@socialcredits.cn',
      confirmAction: modalStore.closeAction
      // cancelAction: closeAction
    });
  };
  return (
    <div className={`clearfix ${styles.info}`}>
      <div className={styles.infoPic}></div>
      <div className={styles.infoDetl}>
        <h2 className={styles.title}>{infoData.name}</h2>
        <p className={styles.description}>{infoData.description}</p>
        <p className={styles.type}>
          <span>资费：计次</span>
          <span>分类：{interfaceType}</span>
        </p>
        <div className={styles['info-btn']}>
          {
            judgeType() ?
            <Button btnType="secondary" className={styles['interface-btn']} onClick={gotoTest}>测试接口</Button> :
            <Button btnType="primary" className={styles['interface-btn']} onClick={handleApply}>立即申请</Button>
          }
        </div>
      </div>
    </div>
  );
}

InterfaceInfo.propTypes = {
  interfaceDetailStore: PropTypes.object,
  modalStore: PropTypes.object,
  routing: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 200
  }),
})(inject('interfaceDetailStore', 'modalStore', 'routing')(observer(InterfaceInfo)));
