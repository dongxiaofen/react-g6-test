import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import RuleAdd from '../RuleAdd';
import RuleSelect from '../RuleSelect';
import RuleItem from '../RuleItem';
// import styles from './index.less';
@inject('ruleListStore', 'uiStore', 'modalStore')
@observer
export default class RuleListMain extends Component {
  static propTypes = {
    ruleListStore: PropTypes.object,
    uiStore: PropTypes.object,
    modalStore: PropTypes.object,
  }

  componentDidMount() {
    this.props.ruleListStore.getRuleList();
  }

  componentWillUnmount() {
    this.props.ruleListStore.resetListData();
  }

  render() {
    // 规则数据列表
    const ruleList = this.props.ruleListStore.ruleList;
    // 修改规则状态
    const changeRuleStatus = this.props.ruleListStore.changeRuleStatus;
    // 修改分享状态
    const changeRuleShare = this.props.ruleListStore.changeRuleShare;
    // 单条数据Id
    const itemData = this.props.ruleListStore.itemData;
    // 我的规则或上级规则
    const ruleType = this.props.ruleListStore.ruleType;
    // switchLoading
    const switchLoading = this.props.ruleListStore.switchLoading;
    // switchLoading
    const switchLoading2 = this.props.ruleListStore.switchLoading2;
    // loading
    const loading = this.props.ruleListStore.loading;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <RuleAdd ruleStore={this.props.ruleListStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleSelect ruleStore={this.props.ruleListStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleItem
                ruleList={ruleList}
                changeRuleStatus={changeRuleStatus}
                changeRuleShare={changeRuleShare}
                itemData={itemData}
                ruleType={ruleType}
                switchLoading={switchLoading}
                switchLoading2={switchLoading2}
                loading={loading}
                setItemData={this.props.ruleListStore.setItemData}
                uiStore={this.props.uiStore}
                modalStore={this.props.modalStore}
                setShowCompanyId={this.props.ruleListStore.setShowCompanyId}
                showCompanyId={this.props.ruleListStore.showCompanyId}
                setShowKeyWordId={this.props.ruleListStore.setShowKeyWordId}
                showKeyWordId={this.props.ruleListStore.showKeyWordId} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
