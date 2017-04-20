import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import RiskFilter from '../RiskFilter';
import RiskCompany from '../RiskCompany';
import RiskMessage from '../RiskMessage';
import styles from './index.less';
import {Container, Row, Col} from 'components/common/layout';
@inject('riskHeadlinesStore')
@observer
export default class RiskMain extends Component {
  componentDidMount() {
    const dimGroupTypeStr = this.props.riskHeadlinesStore.dimGroupTypeStr;
    const params = this.props.riskHeadlinesStore.filterParams;
    this.props.riskHeadlinesStore.getCompanyList(dimGroupTypeStr, params, 'today');
    this.caculateHeight();
  }
  componentWillUnmount() {
    this.props.riskHeadlinesStore.resetRiskStore();
  }
  caculateHeight = ()=> {
    const bodyH = document.body.clientHeight > 800 ? document.body.clientHeight : 800;
    this.containerH = bodyH - 71 - 40; // 60导航条的高度， 上20 下 10
    const riskFilterH = document.getElementById('riskFilter').offsetHeight;
    this.riskComHeight = this.containerH - riskFilterH - 20;
    this.riskMessHeight = this.containerH;
  }
  render() {
    const riskHeadlinesStore = this.props.riskHeadlinesStore;
    const comListCss = riskHeadlinesStore.companyList.data.error || riskHeadlinesStore.companyList.data.errorToday ? styles.riskCompanyNoData : styles.riskCompany; // 没有数据的时候背景为白色
    const messCss = riskHeadlinesStore.events.data.error ? styles.riskMessageNoData : styles.riskMessage;
    return (
      <Container>
        <Row className={styles.riskHeadlines}>
          <Col width="4">
            <div className={styles.wrap} id="riskFilter">
              <RiskFilter riskHeadlinesStore={riskHeadlinesStore}/>
            </div>
            <div id="riskCompany" style={{height: this.riskComHeight}} className={comListCss}>
               <RiskCompany riskHeadlinesStore={riskHeadlinesStore}/>
            </div>
          </Col>
          <Col width="8">
            <div id="riskCompany" style={{height: this.riskMessHeight}} className={messCss}>
               <RiskMessage
                riskHeadlinesStore={riskHeadlinesStore}
                contentHeight={this.containerH}
                history={this.props.history}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
RiskMain.propTypes = {
  riskHeadlinesStore: PropTypes.object,
  homeStore: PropTypes.object,
  history: PropTypes.object,
};
