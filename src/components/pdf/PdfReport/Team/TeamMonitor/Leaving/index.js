import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Leaving({moduleData}) {
  const filterModuleData = {};
  const filterModuleDataKeys = Object.keys(filterModuleData);
  if (!moduleData || filterModuleDataKeys.length === 0) {
    return (
      <div>
        <SecondTitle module="离职意向趋势" />
        <PdfNotFound />
      </div>
    );
  }
  if (moduleData) {
    moduleData.map((item, key) => {
      if (item.size) {
        filterModuleData[key] = item.toJS();
      }
    });
  }
  const data = {
    dataConfig: [
      {key: 'time', width: '4'},
      {key: 'leaving', width: '6'},
    ],
    items: this.formatData(filterModuleData),
    dict: 'recruitLeaving',
  };
  return (
    <div>
      <SecondTitle module="离职意向趋势" />
      <PdfTable {...data} />
    </div>
  );
}

Leaving.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Leaving);
