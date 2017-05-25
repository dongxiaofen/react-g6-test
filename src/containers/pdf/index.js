import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import PdfBody from 'components/pdf/PdfReport';


@observer
export default class Pdf extends Component {
  static propTypes = {
    pdfStore: PropTypes.object,
    props: PropTypes.object,
  }
  // componentDidMount() {
  //   console.log(this.props.pdfStore, '===============');
  //   // this.props.pdfStore.getOverviewData(this.props.routing.location.query.monitorId);
  // }
  render() {
    return (
      <PdfBody />
    );
  }
}
