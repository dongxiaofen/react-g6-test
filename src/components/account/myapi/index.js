import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Table from 'components/common/Table';
// import __flattenDeep from 'lodash/flattenDeep';
import { loadingComp } from 'components/hoc';
// import styles from './index.less';

function MyapiMain({accountStore}) {
  const dataSource = () => {
    const tableData = [];
    const originData = accountStore.myApi.myInterface.data;
    if (originData) {
      const newData = [];
      Object.keys(originData).map(key => {
        originData[key].map((item) => newData.push(item));
      });
      console.log(newData, 'newData');
      // console.log(newData, 'newData');
      // console.log(__flattenDeep(newData), '__flattenDeep(newData)');
      newData.map((item, idx) => {
        tableData.push({
          key: idx,
          id: item.id,
          price: item.price,
          permissionClassification: accountStore.myApi.interfaceType[item.permissionClassification],
        });
      });
    }
    return tableData;
  };
  const columns = [
    {
      title: '接口类别',
      dataIndex: 'permissionClassification',
      key: 'permissionClassification',
    }, {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '资费',
      dataIndex: 'price',
      key: 'price',
      // render: (record, idx) => (<span>{record.price + '-' + idx}</span>),
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
    </div>
  );
}

MyapiMain.propTypes = {
  accountStore: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('accountStore')(observer(MyapiMain)));
