import React from 'react';
import {observer, inject} from 'mobx-react';
import Button from 'components/lib/button';

const AddWhite = ({modalStore}) => {
  const addList = () => {
    modalStore.openCompModal({
      closeAction: '',
      isCustomize: true,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./addForm'));
        });
      }
    });
  };
  return (
    <div>
      <Button
        btnType="primary"
        onClick={addList}>
        添加白名单
      </Button>
    </div>
  );
};

export default inject('modalStore')(observer(AddWhite));
