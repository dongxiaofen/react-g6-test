import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import CompanyCard from './CompanyCard';

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
RiskCompany.propTypes = {
  foo: PropTypes.string,
};
export default observer(RiskCompany);
