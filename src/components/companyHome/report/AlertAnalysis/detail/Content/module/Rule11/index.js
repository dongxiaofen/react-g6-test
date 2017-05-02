import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DetailCard from '../../DetailCard';
function Rule11({data}) {
  const meta = {
    dict: 'rule11',
    body: [
      [{ 'key': 'companyName', colSpan: '1'}, { 'key': 'relation', colSpan: '2'}],
      [{ 'key': 'capChangeInfo', kids: [
        {key: 'altBe', colSpan: '1'},
        {key: 'altAf', colSpan: '1'},
        {key: 'eventTime', colSpan: '1'},
      ]
      }],
    ],
    maxCols: 3,
    items: data.detail,
    hasNumber: true,
  };
  return (
    <DetailCard meta={meta} />
  );
}

Rule11.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule11);
