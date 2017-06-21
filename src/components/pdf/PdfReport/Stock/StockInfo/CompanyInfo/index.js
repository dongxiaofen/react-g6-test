import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';


function CompanyInfo({moduleData, stockCode}) {// stockCode
  if (!moduleData) {
    return (
      <div>
        <SecondTitle module="公司概况"/>
        <PdfNotFound />
      </div>
    );
  }


  moduleData.stockCode = stockCode;
  if (!isNaN(moduleData.reg_cap)) {
    moduleData.reg_cap = (moduleData.reg_cap / 10000).toFixed(2);
  }
  if (!isNaN(moduleData.issued_shares)) {
    moduleData.issued_shares = (moduleData.issued_shares / 10000).toFixed(2);
  }
  const data = {
    dataConfig: [
      {'key': 'stockCode', 'width': '6'},
      {'key': 'company_name', 'width': '6'},
      {'key': 'company_english_name', 'width': '6'},
      {'key': 'legal_person', 'width': '6'},
      {'key': 'secretary', 'width': '6'},
      {'key': 'primary_industry', 'width': '6'},
      {'key': 'issued_price', 'width': '6'},
      {'key': 'issued_shares', 'width': '6'},
      {'key': 'pe', 'width': '6'},
      {'key': 'reg_cap', 'width': '6'},
      {'key': 'listing_date', 'width': '6'},
      {'key': 'prospectus_date', 'width': '6'},
      {'key': 'fax', 'width': '6'},
      {'key': 'zipcode', 'width': '6'},
      {'key': 'website', 'width': '6'},
      {'key': 'reg_address', 'width': '6'},
      {'key': 'release_mode', 'width': '6'},
      {'key': 'sponsor_institution', 'width': '6'},
      {'key': 'listing_recommender', 'width': '6'},
      {'key': 'main_underwriter', 'width': '6'},
    ],
    item: moduleData,
    dict: 'brief',
    type: 'object',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module="公司概况" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

CompanyInfo.propTypes = {
  moduleData: PropTypes.object,
  stockCode: PropTypes.any,
};
export default observer(CompanyInfo);
