import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Container } from 'components/common/layout';
@inject('highRiskCorpStore')
@observer
export default class HighRiskCorp extends Component {
  static propTypes = {
    highRiskCorpStore: PropTypes.object,
  };
  componentDidMount() {
    const store = this.props.highRiskCorpStore;
    store.getStatistic();
    store.getIndustry();
    store.getRecent();
    store.getIncrement();
    store.getArea();
  }
  render() {
    return (
      <Container>
        test
      </Container>
    );
  }
}
