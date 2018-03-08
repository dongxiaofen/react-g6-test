import React from 'react';
import {observer, inject} from 'mobx-react';
import Pager from 'components/common/Pager';
import Table from 'components/common/Table';
import { loadingComp } from 'components/hoc';
import { toJS } from 'mobx';
// import Button from 'components/lib/button';
import moment from 'moment';
const WhiteList = ({safeStore, modalStore}) => {
  const handleDelet = (id) => {
    modalStore.openCompModal({
      title: '删除白名单',
      contentText: '温馨提示：一经删除，该IP地址下的接口将无法调用，请谨慎操作！',
      confirmAction: () => {
        safeStore.deleteWhiteList(id);
        modalStore.closeAction();
      },
      cancelAction: modalStore.closeAction
    });
  };
  const dataSource = () => {
    const originData = safeStore.whiteList.result.data.content;
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
      <Table dataSource={dataSource()} columns={columns}/>
      <div style={{padding: '20px 0', textAlign: 'right'}}>
        <Pager module="safeWhiteListPager" />
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
})(inject('safeStore', 'modalStore')(observer(WhiteList)));
