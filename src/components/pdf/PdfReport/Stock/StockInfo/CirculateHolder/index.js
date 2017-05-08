import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function CirculateHolder({moduleData}) {
  const modifyProportion = (value) => {
    return (value * 100).toFixed(2);
  };
  if (!moduleData) {
    return (
      <div>
        <SecondTitle module="流通股东"/>
        <PdfNotFound />
      </div>
    );
  }

  const date = Object.keys(moduleData)[0];
  const moduleTitle = `流通股东（截止时间${date}）`;
  const data = {
    dataConfig: [
      {'key': 'name', 'width': '4'},
      {'key': 'shares', 'width': '2'},
      {'key': 'proportion', 'width': '1.5', handle: modifyProportion},
      {'key': 'shares_property', 'width': '1.4'},
    ],
    items: moduleData[date],
    dict: 'stockShareHolder',
    hasConfig: true,
  };
  return (
    <div>
      <SecondTitle module={moduleTitle} />
      <PdfTable {...data} />
    </div>
  );
}

CirculateHolder.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CirculateHolder);
