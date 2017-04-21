import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

function hoc(module, apiArr) {
  return (WrappedComponent) => {
    class BatchReport extends Component {
      static propTypes = {
        routing: PropTypes.object,
        [`${module}Store`]: PropTypes.object,
        uiStore: PropTypes.object,
      };
      componentDidMount() {
        if (!this.props[`${module}Store`].isMount) {
          const { monitorId, reportId, companyName, companyType } = this.props.routing.location.query;
          if (module === 'assets' && apiArr) {
            apiArr.map( (apiModule) => {
              if (this.props.uiStore) {
                this.props[`${module}Store`].getReportModule(
                  apiModule.api,
                  monitorId,
                  reportId,
                  companyName,
                  companyType,
                  this.props.uiStore.uiState[apiModule.pageInfo] ? this.props.uiStore.uiState[apiModule.pageInfo] : {'index': 1, 'size': '10'});
              }else {
                this.props[`${module}Store`].getReportModule(apiModule.api, monitorId, reportId, companyName, companyType);
              }
            });
          }else {
            this.props[`${module}Store`].getReportModule(module, monitorId, reportId, companyName, companyType);
          }
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
