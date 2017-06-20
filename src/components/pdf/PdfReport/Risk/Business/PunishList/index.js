import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';


function PunishList({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const newData = () => {
    let newArr = [];
    moduleData.map( (item) => {
      Object.keys(item).map( (key) => {
        if (key === 'isCancel') {
          item[key] = !item[key] && item[key].length === 0 ? '否' : '是';
        }
        item[key] = !item[key] && item[key].length === 0 ? '--' : item[key];
      });
      newArr = [...newArr, item];
    });
    return newArr;
  };
  const data = {
    dataConfig: [
      {'key': 'illegalIncome', 'width': '4'},
      {'key': 'penaltyDate', 'width': '4'},
      {'key': 'isCancel', 'width': '4'},
      {'key': 'penaltyAmount', 'width': '4'},
      {'key': 'forfeitureAmount', 'width': '4'},
      {'key': 'changeAmount', 'width': '4'},
      {'key': 'lawsuit', 'width': '4'},
      {'key': 'reconsideration', 'width': '4'},
      {'key': 'transferJudicialOrg', 'width': '4'},
      {'key': 'illegalActivities', 'width': '12'},
      {'key': 'punishmentExecution', 'width': '12'},
      {'key': 'punishmentBasis', 'width': '12'},
      {'key': 'illegalFacts', 'width': '12'}
    ],
    item: newData(),
    dict: 'punishListInfo',
    type: 'array',
    hasConfig: true,
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

PunishList.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(PunishList);
