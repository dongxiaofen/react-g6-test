import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

function hoc(module) {
  return (WrappedComponent) => {
    class BatchReport extends Component {
      static propTypes = {
        routing: PropTypes.object,
        [`${module}Store`]: PropTypes.object,
      };
      componentDidMount() {
        if (!this.props[`${module}Store`].isMount) {
          const { monitorId, reportId, companyName, companyType } = this.props.routing.location.query;
          this.props[`${module}Store`].getReportModule(module, monitorId, reportId, companyName, companyType);
        }
      }
      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
    return observer(BatchReport);
  };
}
export default hoc;
