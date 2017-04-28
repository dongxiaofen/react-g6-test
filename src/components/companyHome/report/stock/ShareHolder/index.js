import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
function ShareHolder({ shareHolder, isEmptyObject, isLoading }) {
  let output = [];
  let key = '';
  if (!isEmptyObject(shareHolder)) {
    key = Object.keys(shareHolder)[0];
    output = shareHolder[key].map((item) => {
      item.proportion = (item.proportion * 100).toFixed(2);
      return item;
    });
  }
  const data = {
    meta: {
      body: [
        { 'key': 'name', 'width': '2.5' },
        { 'key': 'shares', 'width': '2.5' },
        { 'key': 'proportion', 'width': '2.5' },
        { 'key': 'shares_property', 'width': '2.5' },
      ],
      tData: output,
      dict: 'stockShareHolder',
    },
    isLoading: isLoading,
    module: '十大股东',
    error: isEmptyObject(shareHolder)
  };
  const title = key ? `十大股东 (截止时间：${key}) ` : '十大股东';
  return (
    <div>
      <ModuleTitle module={title} />
      <CommonTable {...data} />
    </div>
  );
}

ShareHolder.propTypes = {
  shareHolder: PropTypes.object,
  isEmptyObject: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default observer(ShareHolder);
