import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import {Container} from 'components/common/layout';
import Title from 'components/analysisList/Title';
import MultiList from 'components/analysisList/MultiList';
import ProfitList from 'components/analysisList/ProfitList';
import OperateList from 'components/analysisList/OperateList';
import DevelopList from 'components/analysisList/DevelopList';
import Waiting from 'components/analysisList/Waiting';
import SearchBar from 'components/common/SearchBar';
import styles from './index.less';

@inject('analysisListStore', 'uiStore', 'routing')
@observer
export default class AnalysisList extends Component {
  static propTypes = {
    analysisListStore: PropTypes.object,
    uiStore: PropTypes.object,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.inputChange = this.inputChange.bind(this);
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
      this.props.analysisListStore.changeValue('activeKey', nextActiveKey);
      this.props.analysisListStore.getAnalysisList();
    }
  }

  changeTabs = (value) => {
    this.props.routing.push(`/analysisList?activeKey=${value}`);
  };
  numWithLoading = (key) => {
    return React.createElement('span', null, key);
  };

  inputChange(evt) {
    this.props.analysisListStore.changeValue(`searchInput`, evt.target.value);
  }

  handleSearch(evt) {
    if (evt.keyCode === 13) {
      this.props.uiStore.updateUiStore(`${this.props.analysisListStore.activeKey}AnalysisPager.index`, 1);
      this.props.analysisListStore.getAnalysisList();
    }
  }

  render() {
    const activeKey = this.props.analysisListStore.activeKey;
    return (
      <Container className={styles.wrap}>
        <Title {...this.props} />
        <SearchBar
          handleChange={this.inputChange}
          handleSearch={this.handleSearch}
          inputValue={this.props.analysisListStore.searchInput}/>
        <Tabs activeKey={activeKey} onChange={this.changeTabs}>
          <TabPane tab={this.numWithLoading('多维综合评价')} key="multi">
            <MultiList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('盈利能力分析')} key="profit">
            <ProfitList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('营运能力分析')} key="operate">
            <OperateList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('成长能力分析')} key="develop">
            <DevelopList {...this.props} />
          </TabPane>
          <TabPane tab="偿债能力分析" key="debt">
            <Waiting watingInfo="企业偿债能力分析反映企业财务状况和经营能力的重要标志，包括短期和长期偿债能力分析，上线准备中，敬请期待"/>
          </TabPane>
          <TabPane tab="资金管理分析" key="capital">
            <Waiting watingInfo="资产管理能力分析用于衡量企业进行资产管理的效率，反映企业运用资产的营运能力方面的财务比率，上线准备中，敬请期待"/>
          </TabPane>
          <TabPane tab="现金流分析" key="cash">
            <Waiting watingInfo="现金流分析对企业一定时期的现金和现金等价物的流入和流出的数量进行分析，上线准备中，敬请期待"/>
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
