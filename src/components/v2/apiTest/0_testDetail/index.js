import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import ContBox from '../contBox';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

function TestDetail({interfaceTestStore}) {
  const interfaceInfo = interfaceTestStore.interfaceInfo.data;
  const interfaceType = interfaceTestStore.interfaceType;
  return (
    <ContBox title="请求详情">
      <div className={styles.detail}>
        <p>接口类别：　{interfaceType[interfaceInfo.permissionClassification]}</p>
        <p>接口名称：　{interfaceInfo.name}</p>
        <p>请求方式：　{interfaceInfo.method}</p>
        <p>请求URL：　{interfaceInfo.uriReg}</p>
      </div>
    </ContBox>
  );
}

TestDetail.propTypes = {
  children: PropTypes.object,
  cssName: PropTypes.string,
  title: PropTypes.string,
};
// export default inject('interfaceTestStore')(observer(TestDetail));
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 400
  }),
})(inject('interfaceTestStore')(observer(TestDetail)));
