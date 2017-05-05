import { observable, action } from 'mobx';
import axios from 'axios';


class PdfStore {
  // pdf数据
  @observable banner = {};
  @observable report = {};
  @observable network = {};
  @observable company = {};
  @observable announcement = {};
  @observable risk = {};
  @observable internet = {};
  @observable trademark = {};
  @observable patent = {};
  @observable bidding = {};
  @observable network = {};
  @observable blacklist = {};
  @observable team = {};

  // summary
  @observable summary = {};

  @action.bound getOverviewData(id) {
    // 获取摘要信息
    axios.get(`/api/pdf?monitorId=${id}&types=SUMMARY`)
      .then(action( (response) => {
        this.banner = response.data.banner;
        this.summary = response.data.summary;
      }))
      .catch((error) => {
        console.log(error);
      });
    // 获取基本信息
    axios.get(`api/monitor/${id}/corpDetail`)
      .then(action( (response) => {
        this.report = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 获取上市披露
    axios.get(`/api/monitor/${id}/stock/company`)
      .then( action( (response) => {
        console.log(response);
        this.company = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 公告列表
    axios.get(`/api/monitor/${id}/stock/announcement`)
      .then( action( (response) => {
        console.log(response);
        this.announcement = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 风险关系
    axios.get(`/api/monitor/${id}/risk`)
      .then( action( (response) => {
        console.log(response);
        this.risk = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 风险关系
    axios.get(`/api/monitor/${id}/internet`)
      .then( action( (response) => {
        this.internet = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 商标
    axios.get(`/api/monitor/${id}/operation/trademark`)
      .then( action( (response) => {
        this.trademark = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 专利
    axios.get(`/api/monitor/${id}/operation/patent`)
      .then( action( (response) => {
        this.patent = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 招投标
    axios.get(`/api/monitor/${id}/operation/bidding`)
      .then( action( (response) => {
        this.bidding = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 网络图
    axios.get(`/api/monitor/${id}/network`)
      .then( action( (response) => {
        this.network = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 黑名单
    axios.get(`/api/monitor/${id}/network/blacklist`)
      .then( action( (response) => {
        this.blacklist = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
    // 团队
    axios.get(`/api/monitor/${id}/team`)
      .then( action( (response) => {
        this.team = response.data;
      }))
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new PdfStore();
