import React from 'react';
import { observer } from 'mobx-react';
import SimpleTabs from 'components/common/SimpleTabs';
import styles from './index.less';
import loadingComp from 'components/hoc/LoadingComp';
import JudgeDoc from './JudgeDoc';
import CourtAnnouncement from './CourtAnnouncement';
import CourtNotice from './CourtNotice';
import CourtExecution from './CourtExecution';
import DishonestyList from './DishonestyList';
import LitigationAssets from './LitigationAssets';

function Court({riskCourtStore}) {
  const court = riskCourtStore.court;
  const courtData = riskCourtStore.court.courtData;
  const modifyTabData = () => {
    const output = court.courtTab.slice(0);
    output.map((tab)=>{
      tab.number = courtData.countCount[tab.label];
    });
    return output;
  };
  const changeTab = (key) => {
    riskCourtStore.updateValue('court.tabAct', key);
  };
  const regTime = (value)=>{
    return value ? value.slice(0, 10) : '--';
  };
  const createModule = ()=> {
    switch (court.tabAct) {
      case 'judeDoc':
        return <JudgeDoc courtData={courtData.judgeDoc.data} regTime={regTime} riskCourtStore={riskCourtStore}/>;
      case 'courtAnnouncement':
        return <CourtAnnouncement courtAnnouncement={courtData.courtAnnouncement} regTime={regTime}/>;
      case 'courtNotice':
        return <CourtNotice courtNotice={courtData.courtNotice} regTime={regTime} />;
      case 'courtExecution':
        return <CourtExecution courtExecution={courtData.courtExecution} regTime={regTime} />;
      case 'dishonestyList':
        return <DishonestyList dishonestyList={courtData.dishonestyList} regTime={regTime} />;
      case 'litigationAssets':
        return <LitigationAssets litigationAssets={courtData.litigationAssets} regTime={regTime} />;
      default:
        return <div></div>;
    }
  };
  return (
    <div>
      <div className={styles.riskTab}>
        <SimpleTabs data={modifyTabData()} active={court.tabAct} clickHandel={changeTab}/>
      </div>
      <div>
        {createModule()}
      </div>
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.riskCourtStore.isLoading,
    error: !props.riskCourtStore.court.hasCourtData,
    module: '法院公告'
  })
})(observer(Court));
