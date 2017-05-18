import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RegisterInfo from 'components/companyHome/report/corpDetail/info/RegisterInfo';
import ShareHolder from 'components/companyHome/report/corpDetail/info/ShareHolder';
import PersonList from 'components/companyHome/report/corpDetail/info/PersonList';
import FiliationList from 'components/companyHome/report/corpDetail/info/FiliationList';

import Enterprise from 'components/companyHome/report/corpDetail/foreign/Enterprise';
import Investment from 'components/companyHome/report/corpDetail/foreign/Investment';
import Office from 'components/companyHome/report/corpDetail/foreign/Office';

import AlterAnalysis from 'components/companyHome/report/corpDetail/alter/AlterAnalysis';
import AlterList from 'components/companyHome/report/corpDetail/alter/AlterList';

import Tab from 'components/companyHome/report/corpDetail/yearReport/Tab';
import BaseInfo from 'components/companyHome/report/corpDetail/yearReport/BaseInfo';
import Website from 'components/companyHome/report/corpDetail/yearReport/Website';
import Investor from 'components/companyHome/report/corpDetail/yearReport/Investor';
import AssetsInfo from 'components/companyHome/report/corpDetail/yearReport/AssetsInfo';
import ShareAlter from 'components/companyHome/report/corpDetail/yearReport/ShareAlter';
import ChangeRecord from 'components/companyHome/report/corpDetail/yearReport/ChangeRecord';
// import Foreign from 'components/companyHome/report/corpDetail/Foreign';
// import Tabs from 'components/lib/tabs';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

@inject('routing', 'corpDetailStore')
@batchReport('corpDetail')
@observer
export default class CorpDetail extends Component {
  static propTypes = {
    corpDetailStore: PropTypes.object,
    routing: PropTypes.object,
  };
  render() {
    const { companyType } = this.props.routing.location.query;
    let disabledTabPane = '';
    if (companyType === 'FREE') {
      disabledTabPane = true;
    }
    const corpDetailStore = this.props.corpDetailStore;
    const isLoading = corpDetailStore.isLoading;
    const errType = {
      '403223': '套餐个数不够',
      '403222': '账号过期',
      '403204': '点数不够',
      // '403202': '该企业无工商登记信息',
    };
    return (
      <Tabs defaultActiveKey="工商基本信息">
        <TabPane tab="工商基本信息" key="工商基本信息">
          <RegisterInfo registerInfo={corpDetailStore.registerInfo} errText={corpDetailStore.errData.errorCode ? errType[corpDetailStore.errData.errorCode] : null} isLoading={isLoading} />
          <ShareHolder shareHolderList={corpDetailStore.shareHolderList} errText={corpDetailStore.errData.errorCode ? errType[corpDetailStore.errData.errorCode] : null} isLoading={isLoading} />
          <PersonList personList={corpDetailStore.personList} errText={corpDetailStore.errData.errorCode ? errType[corpDetailStore.errData.errorCode] : null} isLoading={isLoading} />
          <FiliationList filiationList={corpDetailStore.filiationList} errText={corpDetailStore.errData.errorCode ? errType[corpDetailStore.errData.errorCode] : null} isLoading={isLoading} />
        </TabPane>
        <TabPane disabled={disabledTabPane} tab="对外投资任职" key="对外投资任职">
          <Enterprise entinvItemList={corpDetailStore.entinvItemList} isLoading={isLoading} />
          <Investment frinvList={corpDetailStore.frinvList} isLoading={isLoading} />
          <Office frPositionList={corpDetailStore.frPositionList} isLoading={isLoading} />
        </TabPane>
        <TabPane tab="工商变更" key="工商变更">
          <AlterAnalysis alterAnalysis={corpDetailStore.alterAnalysis} errText={corpDetailStore.errData.errorCode ? errType[corpDetailStore.errData.errorCode] : null} isLoading={isLoading} />
          <AlterList alterList={corpDetailStore.alterList} errText={corpDetailStore.errData.errorCode ? errType[corpDetailStore.errData.errorCode] : null} isLoading={isLoading} />
        </TabPane>
        <TabPane tab="企业年报" key="企业年报">
          <Tab
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            setYearReport={corpDetailStore.setYearReport}
            isLoading={isLoading} />
          <BaseInfo
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            isLoading={isLoading} />
          <Website
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            isLoading={isLoading} />
          <Investor
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            isLoading={isLoading} />
          <AssetsInfo
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            isLoading={isLoading} />
          <ShareAlter
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            isLoading={isLoading} />
          <ChangeRecord
            yearReportList={corpDetailStore.yearReportList}
            yearReportTab={corpDetailStore.yearReportTab}
            isLoading={isLoading} />
        </TabPane>
      </Tabs>
    );
  }
}
