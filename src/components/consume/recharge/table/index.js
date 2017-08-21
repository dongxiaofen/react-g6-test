import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import Table from 'components/common/Table';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';
import moment from 'moment';
// import styles from './index.less';

function RechargeList({consumeStore}) {
  const dataSource = () => {
    const data = consumeStore.recharge.rechargeList.content;
    console.log(data, 'data');
    if (data) {
      return toJS(data);
    }
  };
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      width: '33.33%',
    }, {
      title: '充值点数',
      dataIndex: 'price',
      key: 'price',
      width: '33.33%',
    }, {
      title: '订单日期',
      dataIndex: 'createdTs',
      key: 'createdTs',
      width: '33.33%',
      render: (text) => (moment(text).format('YYYY-MM-DD HH:mm:ss'))
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
      <div style={{padding: '20px 0', textAlign: 'right'}}>
        <Pager module="rechargePager" />
      </div>
    </div>
  );
}

RechargeList.propTypes = {
  consumeStore: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('consumeStore')(observer(RechargeList)));
