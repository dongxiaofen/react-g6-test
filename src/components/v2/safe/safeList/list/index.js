import React from 'react';
import {observer, inject} from 'mobx-react';
import Pager from 'components/common/Pager';
import Table from 'components/common/Table';
import { loadingComp } from 'components/hoc';
import moment from 'moment';
// import styles from './index.less';

function List({safeStore}) {
  const dataSource = () => {
    const tableData = [];
    const originData = safeStore.resetList.result.data.content;
    if (originData) {
      originData.map((item, idx) => {
        tableData.push({
          key: idx,
          ip: item.ip,
          email: '操作说明：' + item.email,
          createdTs: item.createdTs ? moment(item.createdTs).format('YYYY-MM-DD HH:mm:ss') : item.createdTs,
        });
      });
    }
    return tableData;
  };
  const columns = [
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: '更新时间',
      dataIndex: 'createdTs',
      key: 'createdTs',
    }, {
      title: '备注',
      dataIndex: 'email',
      key: 'email',
    }
  ];
  return (
    <div>
      <Table dataSource={dataSource()} columns={columns}/>
      <div style={{padding: '20px 0', textAlign: 'right'}}>
        <Pager module="accountSafe" />
      </div>
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(inject('safeStore')(observer(List)));
// export default inject('safeStore')(observer(List));
