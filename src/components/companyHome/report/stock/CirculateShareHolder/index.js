import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
function CirculateShareHolder({ circulateShareHolder, isEmptyObject, isLoading }) {
  let output = [];
  let key = '';
  if (!isEmptyObject(circulateShareHolder)) {
    key = Object.keys(circulateShareHolder)[0];
    output = circulateShareHolder[key].map((item) => {
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
      dict: 'stockCirculateShareHolder',
    },
    isLoading: isLoading,
    module: '流通股东',
    error: isEmptyObject(circulateShareHolder)
  };
  const title = key ? `流通股东 (截止时间：${key}) ` : '流通股东';
  return (
    <div>
      <ModuleTitle module={title} />
      <CommonTable {...data} />
    </div>
  );
}

CirculateShareHolder.propTypes = {
  circulateShareHolder: PropTypes.object,
  isEmptyObject: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default observer(CirculateShareHolder);
