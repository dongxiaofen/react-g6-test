import React, {Component, PropTypes} from 'react';

export default class AsyncComponent extends Component {
  static propTypes = {
    loader: PropTypes.func.isRequired,
    renderPlaceholder: PropTypes.func
  };
  state = {
    component: null
  }
  componentDidMount() {
    this.props.loader((componentModule) => {
      // console.log('componentModule', componentModule);
      this.setState({
        component: componentModule
      });
    });
  }
  renderPlaceholder() {
    return <div>Loading</div>;
  }
  render() {
    if (this.state.component) {
      return <this.state.component {...this.props}/>;
    }
    return (this.props.renderPlaceholder || this.renderPlaceholder)();
  }
}
