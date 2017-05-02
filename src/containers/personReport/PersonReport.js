import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import PersonReportBody from 'components/personReport';

@inject('routing', 'personReportStore')
@observer
export default class PersonReport extends Component {
  static propTypes = {
    routing: PropTypes.object,
    personReportStore: PropTypes.object,
  };
  componentDidMount() {
    const query = this.props.routing.location.query;
    const params = {
      reportType: query.monitorId ? 'monitor' : 'report',
      companyId: query.monitorId || query.reportId,
      personCheckId: query.personCheckId,
    };
    this.props.personReportStore.getDetailInfo(params);
  }
  render() {
    return (
      <PersonReportBody personReportStore={this.props.personReportStore} />
    );
  }
}
