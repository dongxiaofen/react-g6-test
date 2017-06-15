import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function ExternalService({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="对外任职"/>
        <PdfNotFound />
      </div>
    );
  }
}

ExternalService.propTypes = {
  foo: PropTypes.string,
};
export default observer(ExternalService);
