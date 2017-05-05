import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Statistics({moduleData}) {
  // const moduleData = this.props.data.getIn(['report', 'stock', 'announcement', 'statistic']);
  if (!moduleData || moduleData.size === 0) {
    return (
      <div>
        <SecondTitle module="公告统计表" />
        <PdfNotFound />
      </div>
    );
  }
  const itemData = moduleData.toJS();
  const config = itemData.map((item)=>{
    return {key: item.type, width: 6};
  });
  const statisticData = {};
  itemData.map((item)=>{
    statisticData[item.type] = item.count;
  });
  const data = {
    dataConfig: config,
    item: statisticData,
    type: 'object',
  };
  return (
    <div>
      <SecondTitle module="公告统计表" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

Statistics.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Statistics);
