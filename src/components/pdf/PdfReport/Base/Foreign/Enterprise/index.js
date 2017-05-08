import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Enterprise({moduleData}) {
  if (moduleData === null || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="企业对外投资"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'entName', 'width': '6'},
      {'key': 'entStatus', 'width': '6'},
      {'key': 'entType', 'width': '6'},
      {'key': 'esDate', 'width': '6'},
      {'key': 'fundedRatio', 'width': '6'},
      {'key': 'subConam', 'width': '6'},
      {'key': 'regCap', 'width': '6'},
      {'key': 'name', 'width': '6'},
      {'key': 'regNo', 'width': '6'},
      {'key': 'regOrg', 'width': '6'},
    ],
    item: moduleData,
    dict: 'entinvItemListsPdf',
    type: 'array',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module="企业对外投资" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

Enterprise.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Enterprise);
