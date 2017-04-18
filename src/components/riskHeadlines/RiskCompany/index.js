import React from 'react';
import { observer } from 'mobx-react';
import CompanyCard from './CompanyCard';
import loadingComp from 'components/hoc/LoadingComp';
function RiskCompany({riskHeadlinesStore}) {
  const createCompanyCards = ()=> {
    const output = [];
    riskHeadlinesStore.companyList.data.forEach((item, idx)=>{
      output.push(
        <CompanyCard
          riskHeadlinesStore={riskHeadlinesStore}
          companyData={item}
          key={`CompanyCard${idx}`}/>
      );
    });
    return output;
  };
  return (
    <div>
      {createCompanyCards()}
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.riskHeadlinesStore.companyList.data.length < 1,
    error: props.riskHeadlinesStore.companyList.data.error,
    category: 2,
    imgCategory: 6,
    errCategory: false,
  }),
})(observer(RiskCompany));
