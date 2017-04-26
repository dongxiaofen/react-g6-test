import React from 'react';
import { observer } from 'mobx-react';
import SimpleTabs from 'components/common/SimpleTabs';
import styles from './index.less';
import loadingComp from 'components/hoc/LoadingComp';
import JudgeDoc from './JudgeDoc';
import CourtAnnouncement from './CourtAnnouncement';

function Court({riskStore}) {
  const court = riskStore.court;
  const courtData = riskStore.court.courtData;
  const modifyTabData = () => {
    const output = court.courtTab.slice(0);
    output.map((tab)=>{
      tab.number = courtData.countCount[tab.label];
    });
    return output;
  };
  const changeTab = (key) => {
    riskStore.updateValue('court.tabAct', key);
  };
  const regTime = (value)=>{
    return value ? value.slice(0, 10) : '无';
  };
  const createModule = ()=> {
    switch (court.tabAct) {
      case 'judeDoc':
        return <JudgeDoc courtData={courtData.judgeDoc.data} regTime={regTime} riskStore={riskStore}/>;
      case 'courtAnnouncement':
        return <CourtAnnouncement courtAnnouncement={courtData.courtAnnouncement} regTime={regTime} riskStore={riskStore}/>;
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
    loading: props.riskStore.isLoading,
  })
})(observer(Court));
