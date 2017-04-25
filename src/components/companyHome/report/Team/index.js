import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Tabs from 'components/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import { ModuleTitle } from 'components/common/report';

import RecruitmentInfo from './RecruitmentInfo';
import StaffInfo from './StaffInfo';
import RecentOffers from './RecentOffers';

@inject('teamStore', 'routing')
@batchReport('team')
@observer
export default class Team extends Component {
  static propTypes = {
    teamStore: PropTypes.object,
  }
  render() {
    return (
      <Tabs>
        <TabPane tab="招聘/员工背景">
          <ModuleTitle module="招聘信息" />
          <RecruitmentInfo teamStore={this.props.teamStore} />
          <ModuleTitle module="员工背景" />
          <StaffInfo teamStore={this.props.teamStore} />
          <ModuleTitle module="近期招聘信息" />
          <RecentOffers teamStore={this.props.teamStore} />
        </TabPane>
        <TabPane tab="团队监控分析">
          <ModuleTitle module="新增招聘地点/岗位" />
          <ModuleTitle module="趋势分析" />
        </TabPane>
      </Tabs>
    );
  }
}
