import React, { Component, PropTypes } from 'react';
import { inject, observer} from 'mobx-react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import SubAccount from './SubAccount';
import MyAccount from './MyAccount';
import {Col, Row, Container} from 'components/common/layout';

@inject('accountProfileStore')
@observer
export default class AccountProfileBody extends Component {
  static propTypes = {
    myHomePageStore: PropTypes.object,
  };
  // componentWillMount() {
  //   const pageParams = {
  //     index: 1,
  //     size: 10,
  //   };
  //   this.props.myHomePageStore.getAlert(pageParams);
  //   this.props.myHomePageStore.getStatistic();
  // }
  render() {
    return (
      <Container>
        <Row>
          <Col width="12">
            <Tabs defaultActiveKey="1">
              <TabPane tab="我的账号" key="1">
                <MyAccount />
              </TabPane>
              <TabPane tab="下属子账号" key="2">
                <SubAccount />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}
