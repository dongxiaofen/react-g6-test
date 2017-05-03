import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import PdfBody from 'components/pdf/PdfReport';

@inject('pdfStore', 'routing')
@observer
export default class Pdf extends Component {
  static propTypes = {
    pdfStore: PropTypes.object,
    props: PropTypes.object,
    routing: PropTypes.object,
  }
  componentDidMount() {
    this.props.pdfStore.getOverviewData(this.props.routing.location.query.monitorId);
  }
  render() {
    return (
      <PdfBody />
    );
  }
}
