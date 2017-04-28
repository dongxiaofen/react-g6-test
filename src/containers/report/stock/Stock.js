import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

import Brief from 'components/companyHome/report/stock/Brief';
import ShareHolder from 'components/companyHome/report/stock/ShareHolder';
import CirculateShareHolder from 'components/companyHome/report/stock/CirculateShareHolder';
import Management from 'components/companyHome/report/stock/Management';
import AnnouncementList from 'components/companyHome/report/stock/AnnouncementList';

@inject('stockStore', 'routing')
@batchReport('stock')
@observer
export default class Stock extends Component {
  static propTypes = {
    stockStore: PropTypes.object,
    routing: PropTypes.object,
  }
  render() {
    const stockStore = this.props.stockStore;
    return (
      <Tabs defaultActiveKey="公司概况">
        <TabPane tab="公司概况" key="公司概况">
          <Brief
            brief={stockStore.brief}
            isEmptyObject={stockStore.isEmptyObject}
            isOverViewLoading={stockStore.isOverViewLoading}/>
          <ShareHolder
            shareHolder={stockStore.shareHolder}
            isEmptyObject={stockStore.isEmptyObject}
            isOverViewLoading={stockStore.isOverViewLoading}/>
          <CirculateShareHolder
            circulateShareHolder={stockStore.circulateShareHolder}
            isEmptyObject={stockStore.isEmptyObject}
            isOverViewLoading={stockStore.isOverViewLoading}/>
          <Management
            management={stockStore.management}
            isOverViewLoading={stockStore.isOverViewLoading}/>
        </TabPane>
        <TabPane tab="公告列表" key="公告列表">
          <AnnouncementList
            announcementTypes={stockStore.announcementTypes}
            announcementTypesLoading={stockStore.announcementTypesLoading}
            announcementDatas={stockStore.announcementDatas}
            announcementDatasLoading={stockStore.announcementDatasLoading}
            selectValue={stockStore.selectValue}
            changeAnnouncement={stockStore.changeAnnouncement}
            setSelectValue={stockStore.setSelectValue}
            routing={this.props.routing}/>
        </TabPane>
      </Tabs>
    );
  }
}
