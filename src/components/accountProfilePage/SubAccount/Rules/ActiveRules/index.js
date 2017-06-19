import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CommonList from '../CommonList';
import { loadingComp } from 'components/hoc';

function ActiveRules({data}) {
  return <CommonList data={data} />;
}

ActiveRules.propTypes = {
  foo: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    errCategory: 3,
    errorWords: '',
    error: props.error,
    module: props.module,
    path: props.path,
  })
})(observer(ActiveRules));
