import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import RuleAdd from '../RuleAdd';
import RuleItem from '../RuleItem';
// import styles from './index.less';
@inject('ruleStore', 'uiStore', 'modalStore')
@observer
export default class RuleListMain extends Component {
  static propTypes = {
    ruleStore: PropTypes.object,
    uiStore: PropTypes.object,
    modalStore: PropTypes.object,
  }

  componentDidMount() {
    this.props.ruleStore.getRuleList();
  }

  render() {
    // 规则数据列表
    const ruleList = this.props.ruleStore.ruleList;
    // 修改规则状态
    const changeRuleStatus = this.props.ruleStore.changeRuleStatus;
    // 单条数据Id
    const itemData = this.props.ruleStore.itemData;
    // switchLoading
    const switchLoading = this.props.ruleStore.switchLoading;
    // loading
    const loading = this.props.ruleStore.loading;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <RuleAdd />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleItem
                ruleList={ruleList}
                changeRuleStatus={changeRuleStatus}
                itemData={itemData}
                switchLoading={switchLoading}
                loading={loading}
                setItemData={this.props.ruleStore.setItemData}
                uiStore={this.props.uiStore}
                modalStore={this.props.modalStore} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
