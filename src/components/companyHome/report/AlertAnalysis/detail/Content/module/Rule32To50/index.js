import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DetailCard from '../../DetailCard';
function Rule32To50({data}) {
  const meta = {
    dict: 'rule32to50',
    body: [
      [{ 'key': 'companyName', colSpan: '1'}, { 'key': 'relation', colSpan: '1'}],
      [{ 'key': 'policy', colSpan: '2'}],
    ],
    items: data.detail,
    maxCols: 3,
    hasNumber: true,
  };
  return (
    <DetailCard meta={meta}/>
  );
}

Rule32To50.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule32To50);
