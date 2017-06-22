import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import { ModuleTitle, KvTable } from 'components/common/report';
function Brief({ brief, isEmptyObject, isOverViewLoading, bannerStore }) {
  if (!isEmptyObject(brief)) {
    brief.issued_shares = brief.issued_shares ? (brief.issued_shares / 10000).toFixed(2) : '';
    brief.reg_cap = brief.reg_cap ? (brief.reg_cap / 10000).toFixed(2) : '';
    brief.stockCode = bannerStore.bannerInfoData.stockCode;
  }
  const data = {
    meta: {
      items: brief,
      dict: 'brief',
      body: [
        [{ 'key': 'stockCode', 'type': 'half' }, { 'key': 'company_name', 'type': 'half' }],
        [{ 'key': 'company_english_name', 'type': 'half' }, { 'key': 'legal_person', 'type': 'half' }],
        [{ 'key': 'secretary', 'type': 'half' }, { 'key': 'primary_industry', 'type': 'half' }],
        [{ 'key': 'issued_price', 'type': 'half' }, { 'key': 'issued_shares', 'type': 'half' }],
        [{ 'key': 'pe', 'type': 'half' }, { 'key': 'reg_cap', 'type': 'half' }],
        [{ 'key': 'listing_date', 'type': 'half' }, { 'key': 'prospectus_date', 'type': 'half' }],
        [{ 'key': 'fax', 'type': 'half' }, { 'key': 'zipcode', 'type': 'half' }],
        [{ 'key': 'website', 'type': 'half' }, { 'key': 'reg_address', 'type': 'half' }],
        [{ 'key': 'release_mode', 'type': 'half' }, { 'key': 'sponsor_institution', 'type': 'half' }],
        [{ 'key': 'listing_recommender', 'type': 'half' }, { 'key': 'main_underwriter', 'type': 'half' }],
      ],
    },
    isLoading: isOverViewLoading,
    module: '公司概况',
    error: isEmptyObject(brief)
  };
  return (
    <div>
      <ModuleTitle module="公司概况" />
      <KvTable {...data} />
    </div>
  );
}

Brief.propTypes = {
  brief: PropTypes.object,
  isEmptyObject: PropTypes.func,
  isOverViewLoading: PropTypes.bool,
  bannerStore: PropTypes.object,
};
export default inject('bannerStore')(observer(Brief));
