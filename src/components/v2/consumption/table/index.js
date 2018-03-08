import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
// import { toJS } from 'mobx';
import Table from 'components/common/Table';
import Pager from 'components/common/Pager';
import Button from 'components/lib/button';
import { loadingComp } from 'components/hoc';
import moment from 'moment';
import { Popover } from 'antd';
// import DateSelect from 'components/common/DateSelect';
import styles from './index.less';
import Clipboard from 'clipboard';

class ConsumptionList extends Component {
  static propTypes = {
    consumptionStore: PropTypes.object,
    messageStore: PropTypes.object,
  };
  componentDidMount() {
    const data = this.dataSource();
    data.map(({dataId}) => {
      new Clipboard(`#${dataId}`).on('success', () => {
        this.props.messageStore.openMessage({type: 'info', content: `复制成功`, duration: 3000});
      }).on('error', () => {
        this.props.messageStore.openMessage({type: 'warning', content: `复制失败`, duration: 3000});
      });
    });
  }
  dataSource = () => {
    const data = this.props.consumptionStore.consumptionList.content;
    if (data) {
      // return toJS(data);
      return data.map((item, idx) => {
        return {dataId: `table_${idx}`, ...item};
      });
    }
  }
  statusConfig = (value) => {
    const config = {
      'API_CONSUME_PRE': 'fou',
      'API_CONSUME_SUCCESS': '是',
      'API_CONSUME_FAIL': '否',
    };
    return config[value];
  }
  render() {
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
        render: (text, record) => ((record.totalNum * record.price).toFixed(3))
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
        render: (text, record) => (
          <div className={styles.paramsBox}>
              <Popover content={<div className={styles.popCont}>{text}</div>} trigger="click">
                <div className={styles.text}>{text}</div>
              </Popover>
              <div className={styles.btnCopy} id={record.dataId} data-clipboard-text={text}><Button btnType="primary" className={styles.btn}>复制</Button></div>
            </div>
        )
      }, {
        title: '订单日期',
        dataIndex: 'createdTs',
        key: 'createdTs',
        render: (text) => (moment(text).format('YYYY-MM-DD HH:mm:ss')),
        width: '145px',
      }, {
        title: '是否扣费',
        dataIndex: 'status',
        key: 'status',
        render: (text) => (this.statusConfig(text)),
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
        <Table dataSource={this.dataSource()} columns={columns}/>
        <div style={{padding: '20px 0', textAlign: 'right'}}>
          <Pager module="consumptionV2Pager" />
        </div>
      </div>
    );
  }
}

// function ConsumptionList({consumptionStore}) {
//   // const dataSource = () => {
//   //   const data = consumptionStore.consumptionList.content;
//   //   if (data) {
//   //     return toJS(data);
//   //   }
//   // };
//   // const statusConfig = (value) => {
//   //   const config = {
//   //     'API_CONSUME_PRE': 'fou',
//   //     'API_CONSUME_SUCCESS': '是',
//   //     'API_CONSUME_FAIL': '否',
//   //   };
//   //   return config[value];
//   // };
//   const columns = [
//     {
//       title: '订单编号',
//       dataIndex: 'consumeNum',
//       key: 'consumeNum',
//       width: '180px'
//     }, {
//       title: '消费点数',
//       dataIndex: 'price',
//       key: 'price',
//       width: '75px',
//       render: (text, record) => ((record.totalNum * record.price).toFixed(3))
//     }, {
//       title: '接口类别',
//       dataIndex: 'classification',
//       key: 'classification',
//       width: '140px'
//     }, {
//       title: '接口名称',
//       dataIndex: 'name',
//       key: 'name',
//       width: '145px'
//     }, {
//       title: '查询参数',
//       dataIndex: 'params',
//       key: 'params',
//       width: '310px',
//       render: (text) => (
//         <Popover content={<div className={styles.popCont}>{text} <div className={styles.btn}><Button type="primary">复制</Button></div></div>} trigger="click">
//           <div className={styles.paramsBox}>
//             {text}
//           </div>
//         </Popover>
//       )
//     }, {
//       title: '订单日期',
//       dataIndex: 'createdTs',
//       key: 'createdTs',
//       render: (text) => (moment(text).format('YYYY-MM-DD HH:mm:ss')),
//       width: '145px',
//     }, {
//       title: '是否扣费',
//       dataIndex: 'status',
//       key: 'status',
//       render: (text) => (statusConfig(text)),
//       width: '74px',
//     }, {
//       title: '备注',
//       dataIndex: 'reason',
//       key: 'reason',
//       width: '90px'
//     }
//   ];
//   return (
//     // <div>
//     //   <Table dataSource={dataSource()} columns={columns}/>
//     //   <div style={{padding: '20px 0', textAlign: 'right'}}>
//     //     <Pager module="consumptionV2Pager" />
//     //   </div>
//     // </div>
//   );
// }

// ConsumptionList.propTypes = {
//   consumptionStore: PropTypes.object,
// };

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('consumptionStore', 'messageStore')(observer(ConsumptionList)));
