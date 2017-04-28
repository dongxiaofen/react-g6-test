import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import AbnormalOperation from './AbnormalOperation';
import CheckMessage from './CheckMessage';
import loadingComp from 'components/hoc/LoadingComp';
function Mici({riskStore}) {
  const corpDetailPunish = riskStore.corpDetailPunish;
  return (
    <div>
      <AbnormalOperation abnormalOperation={corpDetailPunish.abnormalOperation}/>
      <CheckMessage checkMessage={corpDetailPunish.checkMessage}/>
    </div>
  );
}

Mici.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.riskStore.isLoading,
  })
})(observer(Mici));
