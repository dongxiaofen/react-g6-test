import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CompanySearch from '../CompanySearch';
import CompanyList from '../CompanyList';
import {Container, Row, Col} from 'components/common/layout';

@inject('ruleCompanyStore', 'uiStore', 'leftBarStore')
@observer
export default class RuleCompanyMain extends Component {
  static propTypes = {
    ruleCompanyStore: PropTypes.object,
    uiStore: PropTypes.object,
    leftBarStore: PropTypes.object,
  }
  componentDidMount() {
    this.props.ruleCompanyStore.getCompanyList();
  }
  componentWillUnmount() {
    this.props.ruleCompanyStore.resetData();
  }
  render() {
    return (
      <div className={styles.box}>
        <Container>
          <Row>
            <Col>
              <CompanySearch ruleCompanyStore={this.props.ruleCompanyStore} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CompanyList
                ruleCompanyStore={this.props.ruleCompanyStore}
                uiStore={this.props.uiStore}
                leftBarStore={this.props.leftBarStore} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
