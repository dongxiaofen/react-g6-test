import { observable, action } from 'mobx';
import axios from 'axios';


class PdfStore {
  // pdf数据
  @observable banner = {};
  @observable report = {};
  @observable network = {};

  // summary
  @observable summary = {};

  @action.bound getOverviewData(id) {
    axios.get(`/api/pdf?monitorId=${id}&types=SUMMARY`)
      .then(action( (response) => {
        this.banner = response.data.banner;
        this.summary = response.data.summary;
        console.log(response.data);
      }))
      .catch((error) => {
        console.log(error);
      });
  }
}
export default new PdfStore();
