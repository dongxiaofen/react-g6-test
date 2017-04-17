import React, { Component, PropTypes } from 'react';
import {Container, Row, Col} from 'components/common/Layout';
import TableList from './TableList';
import { inject, observer } from 'mobx-react';
import pathval from 'pathval';
import Filter from './Filter';
import styles from './index.less';
import { runInAction } from 'mobx';
import NoData from './NoData';
import Modal from 'components/lib/Modal';
import PayModal from 'components/common/PayModal';


@inject('reportManageStore', 'routing', 'payModalStore')
@observer
export default class ReportMain extends Component {
  static propTypes = {
    reportManageStore: PropTypes.object,
    payModalStore: PropTypes.object,
    routing: PropTypes.object
  };
  componentWillMount() {
    this.props.reportManageStore.getReportList(pathval.getPathValue(this.props, 'reportManageStore.params'));
  }
  onOk = () => {
    runInAction('btnLoading', () => {
      pathval.setPathValue(this.props.payModalStore, 'value.btnLoading');
    });
    const reportId = pathval.getPathValue(this.props.payModalStore, 'agreeModal.reportId');
    const params = pathval.getPathValue(this.props.payModalStore, 'params');
    this.props.reportManageStore.upGradeToMonitor(reportId, params, pathval.getPathValue(this.props.payModalStore, 'value.selectValue'));
  }
  success = () => {
    runInAction('secondVisible', () => {
      pathval.setPathValue(this.props.payModalStore, 'value.secondVisible', false);
    });
    // this.props.commonBoundAC.getPayReset();//重置数据
  }
  // formatAlert = () => {
  //   return <span>欢迎使用烽火台， 开始<span className={styles.alert} onClick={this.redirectToCreate}>生成报告</span>吧</span>;
  // }
  redirectToCreate = () => {
    this.props.routing.push('/search');
  }
  knowMsg = () => {
    runInAction('msgModal->show', () => {
      pathval.setPathValue(this.props.reportManageStore, 'msgModal.show', false);
    });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col width="12">
            <div className="clearfix">
              <div className={styles.filter + ' clearfix'}>
                <h1 className={styles.title}>报告列表</h1>
                <div className={styles.filterWrap}>
                  {pathval.getPathValue(this.props.reportManageStore, 'list.data.content') && pathval.getPathValue(this.props.reportManageStore, 'list.data.content').length < 1 ? '' : <Filter />}
                </div>
              </div>
              <div className={styles.listArea}>
                {pathval.getPathValue(this.props.reportManageStore, 'list.data.content') && pathval.getPathValue(this.props.reportManageStore, 'list.data.content').length < 1 ? <NoData /> : <TableList />}
              </div>
              <PayModal
                {...this.props}
                module="monitorModalStatus"
                onOk={this.onOk}/>
              <Modal
                type="info"
                visible={pathval.getPathValue(this.props.reportManageStore, 'msgModal.show')}
                iconType={pathval.getPathValue(this.props.reportManageStore, 'msgModal.iconType')}
                title={pathval.getPathValue(this.props.reportManageStore, 'msgModal.msg')}
                action={this.knowMsg}
                actionText="知道了"
                hideModal={this.knowMsg} />
              <Modal type="info"
                     title={pathval.getPathValue(this.props.payModalStore, 'value.secondText')}
                     visible={pathval.getPathValue(this.props.payModalStore, 'value.secondVisible')}
                     actionText="知道了"
                     action={this.success}
                     hideModal={this.success} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
