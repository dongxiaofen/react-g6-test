import React from 'react';
import {observer, inject} from 'mobx-react';
import Button from 'components/lib/button';

const AddWhite = ({modalStore, safeStore}) => {
  // const resetAddForm
  const addList = () => {
    modalStore.openCompModal({
      closeAction: safeStore.resetAddForm,
      isCustomize: true,
      width: '600px',
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./addForm'));
        });
      }
    });
  };
  return (
    <div style={{marginBottom: '20px'}}>
      <Button
        btnType="primary"
        onClick={addList}>
        添加白名单
      </Button>
    </div>
  );
};

export default inject('modalStore', 'safeStore')(observer(AddWhite));
