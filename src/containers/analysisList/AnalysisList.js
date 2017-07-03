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
import Waiting from 'components/analysisList/Waiting';
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
    const {scoreNum, profitNum, operationNum, growingNum} = this.props.analysisListStore.listCount;
    return (
      <Container className={styles.wrap}>
        <Title {...this.props} />
        <Tabs activeKey={activeKey} onChange={this.changeTabs}>
          <TabPane tab={this.numWithLoading('多维综合评价', scoreNum)} key="multi">
            <MultiList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('盈利能力分析', profitNum)} key="profit">
            <ProfitList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('营运能力分析', operationNum)} key="operate">
            <OperateList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('成长能力分析', growingNum)} key="develop">
            <DevelopList {...this.props} />
          </TabPane>
          <TabPane tab="偿债能力分析" key="debt">
            <Waiting watingInfo="企业偿债能力分析反映企业财务状况和经营能力的重要标志，包括短期和长期偿债能力分析，上线准备中，敬请期待" />
          </TabPane>
          <TabPane tab="资金管理分析" key="capital">
            <Waiting watingInfo="资产管理能力分析用于衡量企业进行资产管理的效率，反映企业运用资产的营运能力方面的财务比率，上线准备中，敬请期待" />
          </TabPane>
          <TabPane tab="现金流分析" key="cash">
            <Waiting watingInfo="现金流分析对企业一定时期的现金和现金等价物的流入和流出的数量进行分析，上线准备中，敬请期待" />
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
