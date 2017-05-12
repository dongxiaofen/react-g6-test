import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function ScopeAlter({data, type}) {
  const itemData = type === 'RULE' ? data.content : data.detail[0];
  itemData.altDate = itemData.eventTime || itemData.altDate;
  const modifyHtml = (value) => {
    return <span dangerouslySetInnerHTML={{__html: value || '--'}} />;
  };
  const meta = {
    dict: 'alterList',
    body: [
      {'key': 'altItem', 'width': '12'},
      {'key': 'altDate', 'width': '12', keyType: 'date'},
      {'key': 'altAf', 'width': '12', modifyBlock: modifyHtml},
      {'key': 'altBe', 'width': '12', modifyBlock: modifyHtml}
    ],
    item: type === 'RULE' ? data.content : data.detail[0],
  };
  return (
    <SimpleCard meta={meta} />
  );
}

ScopeAlter.propTypes = {
  foo: PropTypes.string,
};
export default observer(ScopeAlter);
