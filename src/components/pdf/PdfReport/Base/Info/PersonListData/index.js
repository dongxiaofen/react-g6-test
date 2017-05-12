import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function PersonListData({ moduleData }) {
  if (moduleData === null || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="主要人员"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'name', 'width': '4'},
      {'key': 'position', 'width': '6'},
    ],
    items: moduleData,
    dict: 'personList',
  };
  return (
    <div>
      <SecondTitle module="主要人员" />
      <PdfTable {...data} />
    </div>
  );
}

PersonListData.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(PersonListData);
