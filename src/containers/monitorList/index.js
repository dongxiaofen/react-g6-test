import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
import Button from 'components/lib/button';
import Input from 'components/lib/input';
// import styles from './index.less';
@observer
export default class MonitorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  test = (evt) => {
    console.log(evt.target);
    this.setState({
      value: evt.target.value,
    });
  }
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
        <Button btnType="primary" onClick={this.test}>test</Button>
        <Input inputType="singleline" onChange={this.test} placeholder="test" />
      </Container>
    );
  }
}
