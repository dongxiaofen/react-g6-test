import React, { Component, PropTypes } from 'react';
import { inject, observer} from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import SubAccount from './SubAccount';
import MyAccount from './MyAccount';
import styles from './index.less';
import {Col, Row, Container} from 'components/common/layout';

@inject('accountProfileStore')
@observer
export default class AccountProfileBody extends Component {
  static propTypes = {
    accountProfileStore: PropTypes.object,
  };
  componentWillMount() {
    this.props.accountProfileStore.getAcconutPageInfo();
    this.props.accountProfileStore.getEchartsData();
  }
  render() {
    return (
      <Container>
        <Row className={styles.mTop}>
          <Col width="12">
            <Tabs className={styles.showBox} defaultActiveKey="1">
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
