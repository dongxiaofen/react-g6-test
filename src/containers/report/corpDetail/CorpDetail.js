import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RegisterInfo from 'components/companyHome/report/corpDetail/info/RegisterInfo';
import ShareHolder from 'components/companyHome/report/corpDetail/info/ShareHolder';
import PersonList from 'components/companyHome/report/corpDetail/info/PersonList';
import FiliationList from 'components/companyHome/report/corpDetail/info/FiliationList';

import Enterprise from 'components/companyHome/report/corpDetail/foreign/Enterprise';
// import Foreign from 'components/companyHome/report/corpDetail/Foreign';
import Tabs from 'components/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

@inject('routing', 'corpDetailStore')
@batchReport('corpDetail')
@observer
export default class CorpDetail extends Component {
  static propTypes = {
    corpDetailStore: PropTypes.object
  };
  render() {
    const corpDetailStore = this.props.corpDetailStore;
    const isLoading = corpDetailStore.isLoading;
    return (
      <Tabs>
        <TabPane tab="工商基本信息">
          <RegisterInfo registerInfo={corpDetailStore.registerInfo} isLoading={isLoading} />
          <ShareHolder shareHolderList={corpDetailStore.shareHolderList} isLoading={isLoading} />
          <PersonList personList={corpDetailStore.personList} isLoading={isLoading} />
          <FiliationList filiationList={corpDetailStore.filiationList} isLoading={isLoading} />

        </TabPane>
        <TabPane tab="对外投资任职">
          <Enterprise entinvItemList={corpDetailStore.entinvItemList} isLoading={isLoading} />
        </TabPane>
      </Tabs>
    );
  }
}
