import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

import {Container, Row, Col} from 'components/common/layout';
import styles from './index.less';

// import Filter from './Filter';
import TypeFilter from './TypeFilter';
import TableList from './TableList';

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
    const params = this.props.uiStore.uiState.reportManageList.params;
    this.props.reportManageStore.getReportList(params);
  }
  componentWillUnmount() {
    this.props.uiStore.updateUiStore('reportManageList.reportStatus', 'report');
    this.props.uiStore.updateUiStore('reportManagePager.index', 1);
  }
  render() {
    const reportManageStore = this.props.reportManageStore;
    const uiState = this.props.uiStore.uiState;
    const reportManagePager = uiState.reportManagePager;
    const reportManageList = uiState.reportManageList;
    const styleCofing = {
      marginBottom: reportManagePager.totalElements <= reportManagePager.size ? 20 : 0
    };
    return (
      <Container>
        <Row>
          <Col>
            <div className="clearfix">
              <div className={`clearfix ${styles.filter}`}>
                <h1 className={styles.title}>报告列表</h1>
                <div className={styles.filterWrap}>
                  {/* <Filter /> */}
                </div>
              </div>
            </div>
            <TypeFilter reportManageStore={this.props.reportManageStore} />
            <div className={styles.listArea} style={styleCofing}>
              <TableList
                status={reportManageList.reportStatus}
                listData={reportManageStore.reportList}
                loading={reportManageStore.isLoading}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
