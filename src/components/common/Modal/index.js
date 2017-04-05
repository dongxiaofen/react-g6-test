import React from 'react';
import { observer, inject } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

function Modal({modalStore}) {
  const handleClose = () => {
    modalStore.closeModal();
    if (modalStore.closeFunc) {
      modalStore.closeFunc();
    }
  };
  let output = null;
  const {type, open} = modalStore;
  if (type === 'text') {
    const {title, message} = modalStore;
    const actions = [
      <RaisedButton
        label="确定"
        primary
        onTouchTap={handleClose}
        />
    ];
    output = (
      <Dialog
        modal
        title={title}
        actions={actions}
        open={open}
        >
        {message}
      </Dialog>
    );
  } else if (type === 'async') {
    const {asyncComp} = modalStore;
    console.log(asyncComp);
    // const Test = asyncComp;
    output = (
      <Dialog
        modal
        open={open}
        >
        <modalStore.asyncComp />
      </Dialog>
    );
  }
  return output;
}
export default inject('modalStore')(observer(Modal));

