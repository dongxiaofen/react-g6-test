import React, { Component } from 'react';
import { Container } from 'components/common/layout';
import Waiting from 'components/analysisList/Waiting';
export default class CorpBlackList extends Component {
  render() {
    return (
      <Container>
        <Waiting watingInfo="依托300万高风险数据库，涵盖司法系统、银行系统、支付系统等黑名单及不良记录，对企业进行风险识别，上线准备中，敬请期待" />
      </Container>
    );
  }
}
