import { observable, action } from 'mobx';
// import axios from 'axios';
// import { monitorListApi } from 'api';

class MonitorListStore {
  @observable searchParams = {
    companyName: '',
    sort: 'start_tm,DESC',
    monitorStatus: '',
    index: 1,
    size: 10,
  };
  @observable monitorCount = {};
  @observable mainList = {};
  @action.bound changeParams(params) {
    Object.assign(this.searchParams, params);
  }
}

export default new MonitorListStore();
