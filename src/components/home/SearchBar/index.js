import React from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import TextField from 'material-ui/TextField';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import bgImg from 'imgs/loginBg.png';

function SearchBar({searchStore}) {
  const ChangeSearch = (evt, val) => {
    runInAction('搜索框改变', () => {
      searchStore.searchKey = val;
    });
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      searchStore.getCompanyList();
    }
  };
  return (
    <div>
      <img src={bgImg} />
      <Row>
        <Col span={12} offset={6}>
          <TextField
            floatingLabelText="输入公司名查询"
            value={searchStore.searchKey}
            onChange={ChangeSearch}
            onKeyUp={handleSearch}
            style={{width: '100%'}}
            autoFocus
          />
        </Col>
      </Row>
    </div>
  );
}
export default inject('searchStore')(observer(SearchBar));
