import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';


function ChangeRecord({moduleData}) {
  if (moduleData === undefined || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="修改记录"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'changedItem', 'width': '2'},
      {'key': 'beforeChange', 'width': '3'},
      {'key': 'afterChange', 'width': '3'},
      {'key': 'time', 'width': '2'},
    ],
    items: moduleData,
    dict: 'yearChangeRecords',
  };
  return (
    <div>
      <SecondTitle module="修改记录" />
      <PdfTable {...data} />
    </div>
  );
}

ChangeRecord.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ChangeRecord);
