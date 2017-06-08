import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
import loadingComp from 'components/hoc/LoadingComp';
function AbnormalOperation({abnormalOperation}) {
  const data = {
    meta: {
      body: [
        {'key': 'abntime', 'width': '6'},
        {'key': 'retime', 'width': '6'},
        {'key': 'specause', 'width': '6', hide: true},
        {'key': 'recause', 'width': '6', hide: true},
        {'key': 'decorg', 'width': '12', hide: true},
      ],
      isExpand: false,
      dict: 'jyErrorData',
      cData: abnormalOperation
    },
    module: '经营异常信息',
    error: abnormalOperation.length === 0
  };
  return (
    <div>
      <CardTable {...data} />
    </div>
  );
}

AbnormalOperation.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
  })
})(observer(AbnormalOperation));
