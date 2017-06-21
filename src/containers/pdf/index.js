import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import PdfBody from 'components/pdf/PdfReport';

@inject('pdfStore', 'companyHomeStore', 'routing')
@observer
export default class Pdf extends Component {
  static propTypes = {
    pdfStore: PropTypes.object,
    props: PropTypes.object,
    companyHomeStore: PropTypes.object,
    routing: PropTypes.object,
  }
    componentDidMount() {
      if (this.props.routing.location.query.reportId) {
        this.props.pdfStore.getOverviewData(this.props.routing.location.query.reportId, 'report', 'reportId');
      } else if (this.props.routing.location.query.basicReportId) {
        this.props.pdfStore.getOverviewData(this.props.routing.location.query.basicReportId, 'basicReport', 'basicReportId');
      } else if (this.props.routing.location.query.analysisReportId) {
        this.props.pdfStore.getOverviewData(this.props.routing.location.query.analysisReportId, 'analysis', 'analysisReportId');
      }
    }
  render() {
    return (
      <PdfBody />
    );
  }
}
