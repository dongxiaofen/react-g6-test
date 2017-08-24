import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Table from 'components/common/Table';
// import styles from './index.less';

function InterfaceError({interfaceDetailStore}) {
  const dataSource = () => {
    const initData = interfaceDetailStore.errorDoc.data;
    const data = [];
    Object.keys(initData).map((key) => {
      data.push({
        key: key,
        errorCode: key,
        message: initData[key]
      });
    });
    return data;
  };
  const columns = [
    {
      title: 'errorCode',
      dataIndex: 'errorCode',
      key: 'errorCode',
    }, {
      title: 'message',
      dataIndex: 'message',
      key: 'message',
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
    </div>
  );
}

InterfaceError.propTypes = {
  interfaceDetailStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 11,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(inject('interfaceDetailStore')(observer(InterfaceError)));