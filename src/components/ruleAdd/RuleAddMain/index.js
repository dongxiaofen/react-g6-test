import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import RuleName from '../RuleName';
import RuleRange from '../RuleRange';
import RuleEvent from '../RuleEvent';
import RuleSubmit from '../RuleSubmit';
import styles from './index.less';

@inject('ruleStore')
@observer
export default class RuleAddMain extends Component {
  static propTypes = {
    ruleStore: PropTypes.object,
  }

  componentDidMount() {
    this.props.ruleStore.getIndustryList();
    this.props.ruleStore.getTypeListCORP();
    this.props.ruleStore.getTypeListLEGAL();
    this.props.ruleStore.getTypeListNEWS();
    this.props.ruleStore.getMonitorCompany();
  }

  componentWillUnmount() {
    this.props.ruleStore.resetCreateRuleData();
  }

  eventToggle = (evt)=>{
    this.props.ruleStore.eventToggle(false);
    evt.stopPropagation();
  }

  render() {
    return (
      <div
        tabIndex="1"
        onClick={this.eventToggle.bind()}
        className={styles.box}>
        <Container>
          <Row>
            <Col>
              <RuleName ruleStore={this.props.ruleStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleRange ruleStore={this.props.ruleStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleEvent ruleStore={this.props.ruleStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleSubmit ruleStore={this.props.ruleStore} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
