import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Message from 'components/lib/Message';

function _Message({ messageStore }) {
  const { type, visible, content, clearTimer } = messageStore;
  return (
    <Message
      visible={visible}
      type={type}
      content={content}
      clearTimer={clearTimer}
      closeAction={messageStore.closeMessage} />
  );
}

_Message.propTypes = {
  messageStore: PropTypes.object,
};
export default observer(_Message);
