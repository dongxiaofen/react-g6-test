import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Executive({moduleData}) {
  const moduleTitle = '高管';
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module={moduleTitle}/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'name', 'width': '4'},
      {'key': 'position', 'width': '2'},
      {'key': 'birth_year', 'width': '1.2'},
      {'key': 'gender', 'width': '1.4'},
      {'key': 'degree', 'width': '1.4'}
    ],
    items: moduleData,
    dict: 'stockManagement',

  };
  return (
    <div>
      <SecondTitle module={moduleTitle}/>
      <PdfTable {...data} />
    </div>
  );
}

Executive.propTypes = {
  foo: PropTypes.string,
};
export default observer(Executive);
