import React, { Component } from 'react';
import { Container } from 'components/common/layout';
import Waiting from 'components/analysisList/Waiting';
export default class PersonCheck extends Component {
  render() {
    return (
      <Container>
        <Waiting watingInfo="姓名身份证二要素核验，姓名身份证手机号核验，姓名身份证银行卡号核验，上线准备中，敬请期待" />
      </Container>
    );
  }
}
