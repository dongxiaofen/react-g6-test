import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import Table from 'components/common/Table';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';
import moment from 'moment';
// import DateSelect from 'components/common/DateSelect';
// import styles from './index.less';

function ConsumptionList({consumptionStore}) {
  const dataSource = () => {
    const data = consumptionStore.consumptionList.content;
    if (data) {
      return toJS(data);
    }
  };
  const statusConfig = (value) => {
    const config = {
      'API_CONSUME_PRE': 'fou',
      'API_CONSUME_SUCCESS': '是',
      'API_CONSUME_FAIL': '否',
    };
    return config[value];
  };
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'consumeNum',
      key: 'consumeNum',
      width: '180px'
    }, {
      title: '消费点数',
      dataIndex: 'price',
      key: 'price',
      width: '75px',
      render: (text, record) => (record.totalNum * record.price)
    }, {
      title: '接口类别',
      dataIndex: 'classification',
      key: 'classification',
      width: '140px'
    }, {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
      width: '145px'
    }, {
      title: '查询参数',
      dataIndex: 'params',
      key: 'params',
      width: '310px',
    }, {
      title: '订单日期',
      dataIndex: 'createdTs',
      key: 'createdTs',
      render: (text) => (moment(text).format('YYYY-MM-DD HH:mm:ss')),
      width: '145px',
    }, {
      title: '扣费状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (statusConfig(text)),
      width: '74px',
    }, {
      title: '备注',
      dataIndex: 'reason',
      key: 'reason',
      width: '90px'
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
      <div style={{padding: '20px 0', textAlign: 'right'}}>
        <Pager module="consumptionV2Pager" />
      </div>
    </div>
  );
}

ConsumptionList.propTypes = {
  consumptionStore: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('consumptionStore')(observer(ConsumptionList)));
