import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import TredeBody from './TredeBody';

function Trademark({ trademarkInfo, isLoading }) {
  return (
    <div>
        <ModuleTitle module="商标" />
        <TredeBody trademarkInfo={trademarkInfo}
                   error={!trademarkInfo || trademarkInfo.length === 0}
                   isLoading={isLoading} />
    </div>
  );
}

Trademark.propTypes = {
  isLoading: PropTypes.bool,
};

export default observer(Trademark);
