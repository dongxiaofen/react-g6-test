import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function AlterList({moduleData}) {
  if (moduleData === null || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="变更信息"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'altItem', 'width': '6'},
      {'key': 'altDate', 'width': '6'},
      {'key': 'altBe', 'width': '12'},
      {'key': 'altAf', 'width': '12'},
    ],
    item: moduleData.toJS(),
    dict: 'alterList',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module="变更信息" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

AlterList.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(AlterList);
