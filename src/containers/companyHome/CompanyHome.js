import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Banner from 'components/companyHome/Banner';
import LeftBar from 'components/companyHome/LeftBar';
import { Container, Row, Col } from 'components/common/layout';
import styles from './index.less';

@inject('uiStore', 'bannerStore', 'leftBarStore', 'corpDetailStore', 'riskStore', 'internetStore', 'assetsStore', 'teamStore', 'networkStore', 'blackNetworkStore', 'alertAnalysisStore', 'relPerCheckStore')
@observer
export default class CompanyHome extends Component {
  static propTypes = {
    children: PropTypes.object,
    leftBarStore: PropTypes.object,
    uiStore: PropTypes.object,
    corpDetailStore: PropTypes.object,
    riskStore: PropTypes.object,
    internetStore: PropTypes.object,
    assetsStore: PropTypes.object,
    teamStore: PropTypes.object,
    networkStore: PropTypes.object,
    blackNetworkStore: PropTypes.object,
    alertAnalysisStore: PropTypes.object,
    relPerCheckStore: PropTypes.object,
  };
  componentWillMount() {
    const leftBarStore = this.props.leftBarStore;
    const barConf = leftBarStore.barConf;
    barConf.forEach(item => {
      item.children.forEach(child => {
        if (child.menuKey === leftBarStore.activeItem) {
          leftBarStore.activeMenu = [item.menuKey];
        }
      });
    });
  }
  componentWillUnmount() {
    console.log('CompanyHome componentWillUnmount', window.reportSourceCancel);
    // cancel pending api call
    window.reportSourceCancel.forEach((cancel) => {
      cancel();
    });
    // reset report store data
    ['uiStore', 'bannerStore', 'leftBarStore', 'corpDetailStore', 'riskStore', 'internetStore', 'assetsStore', 'teamStore', 'networkStore', 'blackNetworkStore', 'alertAnalysisStore', 'relPerCheckStore'].map((key)=>{
      if (this.props[key].resetStore) {
        this.props[key].resetStore();
      }
    });
  }
  render() {
    return (
      <div>
        <Banner />
        <div className={styles.contentWrap}>
          <Container id="reportContainer">
            <Row>
              <Col width="2">
                <LeftBar />
              </Col>
              <Col width="10">
                <div id="tabContentWrap" className={styles.tabContentWrap}>
                  {this.props.children}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
