import { observable, action, runInAction } from 'mobx';
class DetailModalStore {
  @observable visible = false;
  @observable title = '';
  @observable titleComp;
  @observable contentComp;
  @observable sourceComp;

  @action.bound closeAction() {
    this.visible = false;
  }

  @action.bound openDetailModal(loader, title, closeAction) {
    loader((_titleComp, _contentComp, _sourceComp) => {
      runInAction(() => {
        this.titleComp = _titleComp;
        this.contentComp = _contentComp;
        if (_sourceComp) { this.sourceComp = _sourceComp; }
      });
    });
    this.visible = true;
    if (title) { this.title = title; }
    if (closeAction) { this.closeAction = closeAction; }
  }
}
export default new DetailModalStore();
