import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { Container } from 'components/common/layout';
import Title from 'components/analysisList/Title';
import MultiList from 'components/analysisList/MultiList';
import ProfitList from 'components/analysisList/ProfitList';
import OperateList from 'components/analysisList/OperateList';
import DevelopList from 'components/analysisList/DevelopList';
import styles from './index.less';

@inject('analysisListStore', 'uiStore', 'routing')
@observer
export default class AnalysisList extends Component {
  static propTypes = {
    analysisListStore: PropTypes.object,
    routing: PropTypes.object
  }
  componentWillMount() {
    const activeKey = this.props.routing.location.query.activeKey || 'multi';
    this.props.analysisListStore.changeValue('activeKey', activeKey);
  }
  componentDidMount() {
    this.props.analysisListStore.getAnalysisCount();
    this.props.analysisListStore.getAnalysisList();
  }
  componentWillReceiveProps(nextProps) {
    const currActiveKey = this.props.analysisListStore.activeKey;
    const nextActiveKey = nextProps.routing.location.query.activeKey;
    if (currActiveKey !== nextActiveKey) {
      const {multiList, profitList, operateList, developList} = this.props.analysisListStore;
      const lessOneNoData = [multiList, profitList, operateList, developList].some(list => {
        return list.content === undefined;
      });
      this.props.analysisListStore.changeValue('activeKey', nextActiveKey);
      if (lessOneNoData) {
        this.props.analysisListStore.getAnalysisList();
      }
    }
  }
  changeTabs = (value) => {
    this.props.routing.push(`/analysisList?activeKey=${value}`);
  }
  numWithLoading = (key, value) => {
    if (value || value === 0) return `${key}（${value}）`;
    const loading = React.createElement('i', {className: 'fa fa-spin fa-spinner'});
    return React.createElement('span', null, key, '（', loading, '）');
  }
  render() {
    const activeKey = this.props.analysisListStore.activeKey;
    const { scoreNum } = this.props.analysisListStore.listCount;
    // const {scoreNum, profitNum, operationNum, growingNum} = this.props.analysisListStore.listCount;
    return (
      <Container className={styles.wrap}>
        <Title {...this.props} />
        <Tabs activeKey={activeKey} onChange={this.changeTabs}>
          <TabPane tab={this.numWithLoading('多维综合评价', scoreNum)} key="multi">
            <MultiList {...this.props} />
          </TabPane>
          <TabPane tab="盈利能力分析" key="profit" disabled>
            <ProfitList {...this.props} />
          </TabPane>
          <TabPane tab="营运能力分析" key="operate" disabled>
            <OperateList {...this.props} />
          </TabPane>
          <TabPane tab="成长能力分析" key="develop" disabled>
            <DevelopList {...this.props} />
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
