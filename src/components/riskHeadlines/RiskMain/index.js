import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import RiskFilter from '../RiskFilter';
import RiskCompany from '../RiskCompany';
// import RiskMessage from './RiskMessage';
import styles from './index.less';
import {Container, Row, Col} from 'components/common/layout';
@inject('riskHeadlinesStore', 'homeStore')
@observer
export default class RiskMain extends Component {
  static propTypes = {
    riskHeadlinesStore: PropTypes.object,
    homeStore: PropTypes.object,
  }
  componentDidMount() {
    // const params = this.props.riskHeadlines.getIn(['filterParams']).toJS();
    // this.props.riskheadlinesBoundAC.getCompanyList(params);
    this.caculateHeight();
    this.props.homeStore.postLogin();
  }
  componentWillUnmount() {
    // this.props.riskheadlinesBoundAC.resetRiskData('filterParams');
    // this.props.riskheadlinesBoundAC.resetRiskData('companyList');
    // this.props.riskheadlinesBoundAC.resetRiskData('events');
    // this.props.riskheadlinesBoundAC.resetRiskData('filterConfig');
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
    const comListCss = riskHeadlinesStore.companyList.data.error ? styles.riskCompanyNoData : styles.riskCompany; // 没有数据的时候背景为白色
    return (
      <Container>
        {/* <DetailsModal
          {...this.props}
          visible={detailsModalConfig.get('visible')}
          titlePath={detailsModalConfig.get('titlePath')}
          contentPath={detailsModalConfig.get('contentPath')}
          sourcePath={detailsModalConfig.get('sourcePath')}
          onCancel={this.detailsModalOnCancel} />*/}
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
            <div id="riskCompany" style={{height: this.riskMessHeight}} className={styles.riskMessage}>
              {/* <RiskMessage
                events={riskHeadlines.get('events')}
                commonBoundAC={this.props.commonBoundAC}
                riskheadlinesBoundAC={this.props.riskheadlinesBoundAC}
                filterParams={riskHeadlines.get('filterParams')}
                contentHeight={this.containerH}
                history={this.props.history}/>*/}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
