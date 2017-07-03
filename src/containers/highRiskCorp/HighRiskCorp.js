import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
// import mobx from 'mobx';
import { Container } from 'components/common/layout';
import CountTitle from 'components/highRiskCorp/CountTitle';
import IndustryDistribute from 'components/highRiskCorp/IndustryDistribute';
import LatestEnterprise from 'components/highRiskCorp/LatestEnterprise';
import EnterpriseIncrement from 'components/highRiskCorp/EnterpriseIncrement';
import AreaDistribute from 'components/highRiskCorp/AreaDistribute';
@inject('highRiskCorpStore')
@observer
export default class HighRiskCorp extends Component {
  static propTypes = {
    highRiskCorpStore: PropTypes.object,
  };
  componentDidMount() {
    const store = this.props.highRiskCorpStore;
    store.getIndustry();
    store.getRecent();
    store.getIncrement();
    store.getArea();
  }
  render() {
    return (
      <Container>
        <CountTitle />
        <IndustryDistribute />
        <LatestEnterprise />
        <EnterpriseIncrement />
        <AreaDistribute />
      </Container>
    );
  }
}
