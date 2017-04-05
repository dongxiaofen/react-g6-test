import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { inject } from 'mobx-react';

function Test({modalStore}) {
  const handleClose = () => {
    modalStore.closeModal();
  };
  return (
    <div>
      i am test
      <RaisedButton
        label="关闭"
        primary
        onTouchTap={handleClose} />
    </div>
  );
}
export default inject('modalStore')(Test);
