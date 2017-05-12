import { observable, action } from 'mobx';
import {companyHomeApi} from 'api';
import uiStore from '../ui';
class NowRecordStore {
  // 数据列表
  @observable dataList = [];
  // 大图是否显示
  @observable show = false;
  // 点击的大图属于第几条数据
  @observable listImgNum = 0;
  // 点击时存储大图base64
  @observable imgTxt = '';
  // 点击时大图的index
  @observable imgIndex = 0;
  // 图片旋转 旋转次数 每次旋转90°
  @observable transform = 0;
  // loading
  @observable loading = false;

  // 获取列表
  @action.bound getNowRecordList(monitorId) {
    // 打开loading
    this.loading = true;
    const params = {
      index: uiStore.uiState.nowRecordPager.index,
      size: uiStore.uiState.nowRecordPager.size,
    };
    // 获取列表数据
    companyHomeApi.getNowRecordList(monitorId, params)
      .then(action('nowRecordList list', (resp) => {
        const listAll = [];
        let singleData = {};
        // 拿到返回值后循环获取每条数据的img
        if (resp.data.content && resp.data.content.length > 0) {
          resp.data.content.map((obj)=>{
            companyHomeApi.getNowRecordPictures(obj.surveyId)
              .then(action('img list', (respImg) => {
                // 将单条数据和单条数据所属的img拼接
                singleData = {item: obj, pictures: respImg.data};
                // dataList
                listAll.push(singleData);
                // 当本来数据的长度和循环返回拼接的数据长度相等时证明已返回所有
                if (resp.data.numberOfElements === listAll.length) {
                  // 冒泡排序
                  for (let array1 = 0; array1 < listAll.length; array1 ++) {
                    for (let array2 = 0; array2 < listAll.length - array1 - 1; array2 ++) {
                      if (listAll[array2].item.surveyId < listAll[array2 + 1].item.surveyId) {
                        const temp = listAll[array2];
                        listAll[array2] = listAll[array2 + 1];
                        listAll[array2 + 1] = temp;
                      }
                    }
                  }
                  // 将数据排序
                  this.dataList = listAll;
                  // 关闭loading
                  this.loading = false;
                  uiStore.uiState.nowRecordPager.totalElements = resp.data.totalElements;
                }
              }))
              .catch(action('img error', (errImg) => {
                console.log(errImg.response, '=====img error');
              }));
          });
        }
      }))
      .catch(action('nowRecordList error', (err) => {
        // 关闭loading
        this.loading = false;
        console.log(err.response, '=====nowRecordList error');
      }));
  }

  // 大图相关
  @action.bound imgContent(idx, img, id) {
    this.imgTxt = img;
    this.imgIndex = id;
    this.listImgNum = idx;
    this.show = true;
  }

  // 上一张
  @action.bound pre() {
    if (this.imgIndex !== 0) {
      // 旋转角度
      this.transform = 0;
      // 图片序号
      this.imgIndex = this.imgIndex - 1;
      // 大图内容
      this.imgTxt = this.dataList[this.listImgNum].pictures[this.imgIndex - 1];
    } else {
      // 提示已经是第一张
    }
  }
  // 下一张
  @action.bound next() {
    // 一共几张图
    const imgLength = this.dataList[this.listImgNum].pictures.length - 1;
    if (this.imgIndex !== imgLength) {
      // 旋转角度
      this.transform = 0;
      // 图片序号
      this.imgIndex = this.imgIndex + 1;
      // 大图内容
      this.imgTxt = this.dataList[this.listImgNum].pictures[this.imgIndex + 1];
    } else {
      // 提示已经是最后一张
    }
  }
  // 关闭大图
  @action.bound closeImg() {
    this.show = false;
    // 旋转角度
    this.transform = 0;
  }
  // 旋转大图
  @action.bound transformImg() {
    if (this.transform === 4) {
      this.transform = 0;
    } else {
      this.transform = this.transform + 1;
    }
  }
  // 重置数据
  @action.bound resetData() {
    // 数据列表
    this.dataList = [];
    // 大图是否显示
    this.show = false;
    // 点击的大图属于第几条数据
    this.listImgNum = 0;
    // 点击时存储大图base64
    this.imgTxt = '';
    // 点击时大图的index
    this.imgIndex = 0;
    // 图片旋转 旋转次数 每次旋转90°
    this.transform = 0;
    // loading
    this.loading = false;
  }
}
export default new NowRecordStore();
