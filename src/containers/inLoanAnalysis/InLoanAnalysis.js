import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import InLoanAnalysisBody from 'components/inLoanAnalysis';
import Title from 'components/inLoanAnalysis/Title';
import { Container } from 'components/common/layout';
@observer
export default class InLoanAnalysis extends Component {
  render() {
    return (
      <Container>
        <Title {...this.props} />
      </Container>
    );
  }
}
