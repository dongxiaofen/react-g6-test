import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import PdfBody from 'components/pdf/PdfReport';

@inject('pdfStore', 'companyHomeStore')
@observer
export default class Pdf extends Component {
  static propTypes = {
    pdfStore: PropTypes.object,
    props: PropTypes.object,
    companyHomeStore: PropTypes.object,
  }
  componentDidMount() {
    this.props.pdfStore.getOverviewData(38);
  }
  render() {
    return (
      <PdfBody />
    );
  }
}
