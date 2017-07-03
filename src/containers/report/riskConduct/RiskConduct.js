import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import BlackNetwork from 'components/companyHome/report/blackNetwork/BlackNetwork';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import styles from './index.less';
@inject('routing', 'blackNetworkStore')
@batchReport('blackNetworkStore')
@observer
export default class RiskConduct extends Component {
  static propTypes = {
    blackNetworkStore: PropTypes.object
  };
  render() {
    const {isLoading, error} = this.props.blackNetworkStore;
    return (
      <Tabs defaultActiveKey="风险链条">
        <TabPane tab="风险链条" key="风险链条">
          <BlackNetwork {...{isLoading, error}} />
        </TabPane>
        <TabPane tab="风险量化" key="风险量化">
          <div className={styles.text}>
            * 通过验证<span>大量黑名单企业</span>和<span>白名单企业</span>的网络拓扑结构及风险节点属性，基于<span>复杂网络理论</span> 和<span>风险传导模型</span>，进行<span>风险节点识别</span>及<span>风险传导量化</span>。
          </div>
          <div className={styles.content}>
            该功能，暂时尚未开放
          </div>
        </TabPane>
      </Tabs>
    );
  }
}
