import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DetailCard from '../../DetailCard';
function Rule7({data}) {
  const modifyData = ()=>{
    const newsDetail = data.detail.slice(0);
    newsDetail.forEach((detailItem)=> {
      let casesDis = 0;
      let casesLegal = 0;
      detailItem.cases.map((caseItem)=> {
        if (caseItem.name === '失信被执行') {
          casesDis += caseItem.value;
        } else {
          casesLegal += caseItem.value;
        }
      });
      detailItem.casesDis = casesDis;
      detailItem.casesLegal = casesLegal;
    });
    return newsDetail;
  };
  const setColSpan = (sel, other) => {
    if (sel < 1) {
      return 0;
    } else if (other < 1) {
      return 2;
    }
    return 1;
  };
  const modifyColSpan = (key, value, obj) => {
    if (key === 'casesDis') {
      return setColSpan(value, obj.casesLegal);
    } else if (key === 'casesLegal') {
      return setColSpan(value, obj.casesDis);
    }
  };
  const modifyNumber = (value) => {
    return `${value} 条`;
  };
  const detailData = modifyData();
  const meta = {
    dict: 'rule7',
    body: [
      [
        { 'key': 'companyName', colSpan: '1', modifyType: 'companyName', keyType: 'block'},
        { 'key': 'relation', colSpan: '1', modifyType: 'relationShip'}
      ],
      [
        { 'key': 'casesDis', colSpanHandle: modifyColSpan.bind(null, 'casesDis'), modifyBlock: modifyNumber, keyType: 'important'},
        {'key': 'casesLegal', colSpanHandle: modifyColSpan.bind(null, 'casesLegal'), modifyBlock: modifyNumber, keyType: 'important'}
      ],
    ],
    maxCols: 2,
    items: detailData,
    hasNumber: true,
  };
  return (
    <DetailCard meta={meta} />
  );
}

Rule7.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule7);
