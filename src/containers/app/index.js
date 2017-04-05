import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import MyAlert from 'components/common/MyAlert';
import Modal from 'components/common/Modal';

@observer
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <div>
        {true && <DevTools />}
        <MyAlert />
        <Modal />
        {this.props.children}
      </div>
    );
  }
}
