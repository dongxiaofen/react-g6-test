import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Tab from './Tab';
import BaseInfo from './BaseInfo';
import WebSite from './WebSite';
import Investor from './Investor';
import AssetsInfo from './AssetsInfo';
import ShareAlter from './ShareAlter';
import ChangeRecord from './ChangeRecord';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
// import styles from './index.less';

function YearReportList({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <PdfNotFound />
      </div>
    );
  }
  const list = [];
  moduleData.map((data, idx)=>{
    list.push(
      <div key={`${idx}yearReport`}>
        <Tab dataSingle={data} />
        <BaseInfo moduleData={data.baseInfo} />
        <WebSite moduleData={data.websiteList} />
        <Investor moduleData={data.investorInformations} />
        <AssetsInfo moduleData={data.assetsInfo} />
        <ShareAlter moduleData={data.equityChangeInformations} />
        <ChangeRecord moduleData={data.changeRecords} />
      </div>
    );
  });
  return (
    <div>
      {list}
    </div>
  );
}

YearReportList.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(YearReportList);
