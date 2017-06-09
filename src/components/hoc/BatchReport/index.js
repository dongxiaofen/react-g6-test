import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

function hoc(store) {
  return (WrappedComponent) => {
    class BatchReport extends Component {
      static propTypes = {
        routing: PropTypes.object,
        [store]: PropTypes.object,
        companyHomeStore: PropTypes.object,
      };
      componentDidMount() {
        if (!this.props[store].isMount) {
          const idParams = this.props.companyHomeStore.reportInfo;
          this.props[store].getReportModule(idParams);
        }
      }
      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
    return inject('companyHomeStore')(observer(BatchReport));
  };
}
export default hoc;
