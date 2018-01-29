import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import Table from 'components/common/Table';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';
import moment from 'moment';
import DateSelect from '../../filter/dateSelect';
// import styles from './index.less';

function ConsumptionList({consumeStore}) {
  const dataSource = () => {
    const data = consumeStore.consumption.consumptionList.content;
    if (data) {
      return toJS(data);
    }
  };
  const columns = [
    {
      title: <DateSelect type="consumption" />,
      dataIndex: 'createdTs',
      key: 'createdTs',
      render: (text) => (moment(text).format('YYYY-MM-DD HH:mm:ss'))
    }, {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '接口类别',
      dataIndex: 'permissionClassification',
      key: 'permissionClassification',
      render: (text) => {
        return consumeStore.interfaceType[text] ? consumeStore.interfaceType[text] : text;
      }
    }, {
      title: '接口名称',
      dataIndex: 'permissionName',
      key: 'permissionName',
    }, {
      title: '查询参数',
      dataIndex: 'sdkApiRecordParams',
      key: 'sdkApiRecordParams',
      width: '40%',
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
      <div style={{padding: '20px 0', textAlign: 'right'}}>
        <Pager module="consumptionPager" />
      </div>
    </div>
  );
}

ConsumptionList.propTypes = {
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
})(inject('consumeStore')(observer(ConsumptionList)));
