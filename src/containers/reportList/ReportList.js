import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { Container } from 'components/common/layout';
import Title from 'components/reportList/Title';
import BasicList from 'components/reportList/BasicList';
import AdvancedList from 'components/reportList/AdvancedList';
import styles from './index.less';

@inject('reportListStore', 'uiStore', 'routing')
@observer
export default class ReportList extends Component {
  static propTypes = {
    reportListStore: PropTypes.object,
    routing: PropTypes.object
  }
  componentWillMount() {
    const activeKey = this.props.routing.location.query.activeKey || 'basic';
    this.props.reportListStore.changeValue('activeKey', activeKey);
  }
  componentDidMount() {
    this.props.reportListStore.getReportCount();
    this.props.reportListStore.getReportList();
  }
  componentWillReceiveProps(nextProps) {
    const currActiveKey = this.props.reportListStore.activeKey;
    const nextActiveKey = nextProps.routing.location.query.activeKey;
    if (currActiveKey !== nextActiveKey) {
      const {basicList, advancedList} = this.props.reportListStore;
      const lessOneNoData = [basicList, advancedList].some(list => {
        return list.content === undefined;
      });
      this.props.reportListStore.changeValue('activeKey', nextActiveKey);
      if (lessOneNoData) {
        this.props.reportListStore.getReportList();
      }
    }
  }
  changeTabs = (value) => {
    this.props.routing.push(`/reportList?activeKey=${value}`);
  }
  render() {
    const activeKey = this.props.reportListStore.activeKey;
    const {basicReportNum, reportNum} = this.props.reportListStore.listCount;
    return (
      <Container className={styles.wrap}>
        <Title {...this.props} />
        <Tabs activeKey={activeKey} onChange={this.changeTabs}>
          <TabPane tab={`基础报告（${basicReportNum}）`} key="basic">
            <BasicList {...this.props} />
          </TabPane>
          <TabPane tab={`高级报告（${reportNum}）`} key="advanced">
            <AdvancedList {...this.props} />
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
