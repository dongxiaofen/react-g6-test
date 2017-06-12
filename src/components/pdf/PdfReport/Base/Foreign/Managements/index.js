import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function Managements({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
}

Managements.propTypes = {
  foo: PropTypes.string,
};
export default observer(Managements);
