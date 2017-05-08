import { observable, action, runInAction } from 'mobx';
class DetailModalStore {
  @observable visible = false;
  @observable title = '';
  @observable titleComp;
  @observable contentComp;
  @observable sourceComp;
  @observable leftBarComp;

  @action.bound closeAction() {
    this.visible = false;
    this.titleComp = null;
    this.contentComp = null;
    this.sourceComp = null;
    this.leftBarComp = null;
    this.title = '';
  }

  @action.bound openDetailModal(loader, title, closeAction) {
    loader((_titleComp, _contentComp, _sourceComp, _leftBarComp) => {
      runInAction(() => {
        this.titleComp = _titleComp;
        this.contentComp = _contentComp;
        this.sourceComp = _sourceComp;
        this.leftBarComp = _leftBarComp;
      });
    });
    this.visible = true;
    if (title) { this.title = title; }
    if (closeAction) { this.closeAction = closeAction; }
  }
}
export default new DetailModalStore();
