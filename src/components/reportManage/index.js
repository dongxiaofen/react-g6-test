import React, { Component, PropTypes } from 'react';
import {Container, Row, Col} from 'components/common/layout';
import TableList from './TableList';
import { inject, observer } from 'mobx-react';
import pathval from 'pathval';
import Filter from './Filter';
import styles from './index.less';
import NoData from './NoData';


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
  render() {
    return (
      <Container>
        <Row>
          <Col width="12">
            <div className="clearfix">
              <div className={styles.filter + ' clearfix'}>
                <h1 className={styles.title}>报告列表</h1>
                <div className={styles.filterWrap}>
                  <Filter />
                </div>
              </div>
              <div className={styles.listArea}>
                {pathval.getPathValue(this.props.reportManageStore, 'list.data.content') && pathval.getPathValue(this.props.reportManageStore, 'list.data.content').length < 1 ? <NoData /> : <TableList />}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
