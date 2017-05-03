import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function ScopeAlter({data}) {
  const meta = {
    dict: 'alterList',
    body: [
      {'key': 'altItem', 'width': '12'},
      {'key': 'altDate', 'width': '12'},
      {'key': 'altAf', 'width': '12'},
      {'key': 'altBe', 'width': '12'}
    ],
    item: data.detail[0],
  };
  return (
    <SimpleCard meta={meta} />
  );
}

ScopeAlter.propTypes = {
  foo: PropTypes.string,
};
export default observer(ScopeAlter);
