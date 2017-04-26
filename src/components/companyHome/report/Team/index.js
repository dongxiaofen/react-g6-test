import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import { ModuleTitle } from 'components/common/report';

import RecruitmentInfo from './RecruitmentInfo';
import StaffInfo from './StaffInfo';
import RecentOffers from './RecentOffers';

import TrendAnalysis from './TrendAnalysis';
import SiteAndJob from './SiteAndJob';

@inject('teamStore', 'routing')
@batchReport('team')
@observer
export default class Team extends Component {
  static propTypes = {
    teamStore: PropTypes.object,
  }
  render() {
    const teamStore = this.props.teamStore;
    return (
      <Tabs defaultActiveKey="招聘/员工背景">
        <TabPane tab="招聘/员工背景" key="招聘/员工背景">
          <div>
            <ModuleTitle module="招聘信息" />
            <RecruitmentInfo teamStore={teamStore}/>
          </div>
          <div>
            <ModuleTitle module="员工背景" />
            <StaffInfo
              finishSchool={teamStore.finishSchool}
              majorInfo={teamStore.majorInfo}
              isLoading={teamStore.isLoading}/>
          </div>
          <div>
            <ModuleTitle module="近期招聘信息" />
            <RecentOffers
              recentRecruitment={teamStore.recentRecruitment}
              isLoading={teamStore.isLoading}/>
          </div>
        </TabPane>
        <TabPane tab="团队监控分析" key="团队监控分析">
          <div>
            <ModuleTitle module="新增招聘地点/岗位" />
            <SiteAndJob />
          </div>
          <div>
            <ModuleTitle module="趋势分析" />
            <TrendAnalysis
              salaryAvgTrend={teamStore.salaryAvgTrend}
              leaveTrend={teamStore.leaveTrend}
              isLoading={teamStore.isLoading} />
          </div>
        </TabPane>
      </Tabs>
    );
  }
}
