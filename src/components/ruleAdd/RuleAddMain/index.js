import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import RuleName from '../RuleName';
import RuleRange from '../RuleRange';
import RuleEvent from '../RuleEvent';
import RuleShare from '../RuleShare';
import RuleSubmit from '../RuleSubmit';
import styles from './index.less';

@inject('ruleAddStore')
@observer
export default class RuleAddMain extends Component {
  static propTypes = {
    ruleAddStore: PropTypes.object,
  }

  componentDidMount() {
    this.props.ruleAddStore.getIndustryList();
    this.props.ruleAddStore.getTypeListCORP();
    this.props.ruleAddStore.getTypeListLEGAL();
    this.props.ruleAddStore.getTypeListNEWS();
    this.props.ruleAddStore.getMonitorCompany();
  }

  componentWillUnmount() {
    this.props.ruleAddStore.resetCreateRuleData();
  }

  eventToggle = (evt)=>{
    this.props.ruleAddStore.eventToggle(false);
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
              <RuleName ruleStore={this.props.ruleAddStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleRange ruleStore={this.props.ruleAddStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleEvent ruleStore={this.props.ruleAddStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleShare ruleStore={this.props.ruleAddStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <RuleSubmit ruleStore={this.props.ruleAddStore} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
