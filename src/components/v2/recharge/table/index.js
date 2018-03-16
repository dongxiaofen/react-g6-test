import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import Table from 'components/common/Table';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';
import moment from 'moment';
// import DateSelect from 'components/common/DateSelect';
// import styles from './index.less';

function RechargeList({rechargeStore}) {
  const dataSource = () => {
    const data = rechargeStore.rechargeList.content;
    if (data) {
      return toJS(data);
    }
  };
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'rechargeNum',
      key: 'rechargeNum',
      width: '33.33%',
    }, {
      title: '充值点数',
      dataIndex: 'price',
      key: 'price',
      width: '33.33%',
    }, {
      // title: <DateSelect type="recharge" />,
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
        <Pager module="rechargeV2Pager" />
      </div>
    </div>
  );
}

RechargeList.propTypes = {
  rechargeStore: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('rechargeStore')(observer(RechargeList)));
