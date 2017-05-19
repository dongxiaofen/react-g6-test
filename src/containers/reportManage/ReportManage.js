import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

import { Container, Row, Col } from 'components/common/layout';
import styles from './index.less';

import Filter from 'components/reportManage/Filter';
// import TypeFilter from 'components/reportManage/TypeFilter';
import TableList from 'components/reportManage/TableList';

@inject('reportManageStore', 'uiStore', 'routing', 'payModalStore')
@observer
export default class ReportMain extends Component {
  static propTypes = {
    reportManageStore: PropTypes.object,
    payModalStore: PropTypes.object,
    uiStore: PropTypes.object,
    routing: PropTypes.object
  }
  componentDidMount() {
    const reportManagePager = this.props.uiStore.uiState.reportManagePager;
    this.props.reportManageStore.getReportList({
      companyName: '',
      index: reportManagePager.index,
      size: reportManagePager.size
    });
  }
  componentWillUnmount() {
    this.props.uiStore.updateUiStore('reportManageList.reportStatus', 'report');
    this.props.uiStore.updateUiStore('reportManagePager.index', 1);
    this.props.reportManageStore.setCompanyName('');
    this.props.reportManageStore.setFocus(false);
  }
  render() {
    const reportManageStore = this.props.reportManageStore;
    const uiState = this.props.uiStore.uiState;
    const reportManagePager = uiState.reportManagePager;
    const reportManageList = uiState.reportManageList;
    return (
      <Container>
        <Row>
          <Col>
            <div className="clearfix">
              <h1 className={styles.title}>报告列表</h1>
              <Filter
                reportManageStore={this.props.reportManageStore}
                status={reportManageList.reportStatus}
                reportManagePager={reportManagePager} />
            </div>
            {/* <TypeFilter reportManageStore={this.props.reportManageStore} /> */}
            <div className={styles.listArea}>
              <TableList
                status={reportManageList.reportStatus}
                listData={reportManageStore.reportList}
                loading={reportManageStore.isLoading} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
