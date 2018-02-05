import React from 'react';
import {observer, inject} from 'mobx-react';
import Pager from 'components/common/Pager';
import Table from 'components/common/Table';
import { loadingComp } from 'components/hoc';
import { toJS } from 'mobx';
// import Button from 'components/lib/button';
import moment from 'moment';
const WhiteList = ({accountStore}) => {
  const handleDelet = (id) => {
    console.log(id, 'id');
    accountStore.deleteWhiteList(id);
  };
  const dataSource = () => {
    const originData = accountStore.safe.whiteList.result.data.content;
    return toJS(originData);
  };
  const columns = [
    {
      title: '白名单IP',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: '创建时间',
      dataIndex: 'createdTs',
      key: 'createdTs',
      render: (text) => {
        return text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : text;
      }
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '操作',
      // dataIndex: 'handle',
      key: 'handle',
      render: (text, record) => (
        <a onClick={handleDelet.bind(null, record.id)}>删除</a>
      )
    }
  ];
  return (
    <div>
      {/*<div>
        <Button
          btnType="primary"
          onClick={accountStore.handleSubmit}
          className={`fs5 ${styles.submit}`}>
          添加白名单
        </Button>
      </div>*/}
      <Table dataSource={dataSource()} columns={columns}/>
      <div style={{padding: '20px 0', textAlign: 'right'}}>
        <Pager module="accountWhiteListPager" />
      </div>
    </div>
  );
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(inject('accountStore')(observer(WhiteList)));
