import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Table from 'components/common/Table';
// import __flattenDeep from 'lodash/flattenDeep';
import { loadingComp } from 'components/hoc';
import { toJS } from 'mobx';
import Pager from 'components/common/Pager';
import styles from './index.less';

function MyapiMain({myApiStore}) {
  const dataSource = () => {
    const originData = myApiStore.myInterface.list;
    // if (originData) {
    //   const newData = [];
    //   Object.keys(originData).map(key => {
    //     originData[key].map((item) => newData.push(item));
    //   });
    //   newData.map((item, idx) => {
    //     tableData.push({
    //       key: idx,
    //       id: item.id,
    //       name: item.name,
    //       price: item.price,
    //       permissionClassification: myApiStore.interfaceType[item.permissionClassification],
    //     });
    //   });
    // }
    return toJS(originData);
  };
  const columns = [
    {
      title: '接口类别',
      dataIndex: 'classification',
      key: 'classification',
    }, {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '资费',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => {
        const chargeTypeDict = {
          'BY_CHARGE': '次',
          'MONTH_CHARGE': '月',
          'ACCORDE_CHARGE': '条'
        };
        return `${text}点/${chargeTypeDict[record.chargeType]}`;
      }
    }, {
      title: '剩余量（条/次）',
      dataIndex: 'allowance',
      key: 'allowance',
      render: (text, record) => {
        if (record.chargeType === 'MONTH_CHARGE') {
          return '/';
        }
        return text === '' ? '不限' : text;
      }
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
      <div className={styles.pagerWrap}>
        <Pager module="myInterfaceV2Pager" />
      </div>
    </div>
  );
}

MyapiMain.propTypes = {
  myApiStore: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('myApiStore')(observer(MyapiMain)));
