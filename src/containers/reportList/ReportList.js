import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import {Container} from 'components/common/layout';
import Title from 'components/reportList/Title';
import BasicList from 'components/reportList/BasicList';
import SearchBar from 'components/common/SearchBar';
import AdvancedList from 'components/reportList/AdvancedList';
import styles from './index.less';

@inject('reportListStore', 'uiStore', 'routing')
@observer
export default class ReportList extends Component {
  static propTypes = {
    reportListStore: PropTypes.object,
    routing: PropTypes.object,
    uiStore: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.changeTabs = this.changeTabs.bind(this);
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
      this.props.reportListStore.changeValue('activeKey', nextActiveKey);
      this.props.reportListStore.getReportList();
    }
  }

  componentWillUnmount() {
    this.props.reportListStore.changeValue(`searchInput`, '');
  }

  handleSearch(evt) {
    if (evt.keyCode === 13) {
      this.props.uiStore.updateUiStore(`${this.props.reportListStore.activeKey}ReportPager.index`, 1);
      this.props.reportListStore.getReportList();
    }
  }

  inputChange(evt) {
    this.props.reportListStore.changeValue(`searchInput`, evt.target.value);
  }

  changeTabs(value) {
    this.props.routing.push(`/reportList?activeKey=${value}`);
  }

  numWithLoading(key) {
    return React.createElement('span', null, key);
  }

  render() {
    const activeKey = this.props.reportListStore.activeKey;
    return (
      <Container className={styles.wrap}>
        <Title {...this.props} />
        <SearchBar
          handleChange={this.inputChange}
          handleSearch={this.handleSearch}
          inputValue={this.props.reportListStore.searchInput}/>
        <Tabs activeKey={activeKey} onChange={this.changeTabs}>
          <TabPane tab={this.numWithLoading('基础报告')} key="basic">
            <BasicList {...this.props} />
          </TabPane>
          <TabPane tab={this.numWithLoading('高级报告')} key="advanced">
            <AdvancedList {...this.props} />
          </TabPane>
        </Tabs>
      </Container>
    );
  }
}
