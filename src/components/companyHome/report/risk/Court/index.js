import React from 'react';
import { observer } from 'mobx-react';
import SimpleTabs from 'components/common/SimpleTabs';
import styles from './index.less';
import loadingComp from 'components/hoc/LoadingComp';
import JudgeDoc from './JudgeDoc';

function Court({court, updateValue}) {
  const courtData = court.courtData;
  const modifyTabData = () => {
    const output = court.courtTab.slice(0);
    output.map((tab)=>{
      tab.number = courtData.countCount[tab.label];
    });
    return output;
  };
  const changeTab = (key) => {
    updateValue('court.tabAct', key);
  };
  const regTime = (value)=>{
    return value ? value.slice(0, 10) : '无';
  };
  const createModule = ()=> {
    switch (court.tabAct) {
      case 'judeDoc':
        return <JudgeDoc courtData={courtData.judgeDoc.data} regTime={regTime}/>;
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
    loading: props.isLoading,
  })
})(observer(Court));
