import React from 'react';
import { observer } from 'mobx-react';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

// function SearchItem({item, showDetail, muiTheme}) {
function SearchItem({item, showDetail}) {
  const {company, address, monitorStatus, monitorId} = item;
  // console.log(company, address, monitorStatus, monitorId, muiTheme);// 测试响应relationStore.monitorId变化
  const raisedBtnStyle = {
    buttonStyle: {
      height: '30px',
      lineHeight: '30px'
    },
    overlayStyle: {
      height: '30px'
    }
  };
  return (
    <Card>
      <CardHeader
        title={company}
        actAsExpander
        showExpandableButton
        />
      <CardActions>
        <RaisedButton
          {...raisedBtnStyle}
          secondary
          onClick={showDetail.bind(this, monitorId, company)}
          label="查看网络图"
          labelPosition="before"
          icon={<i className="material-icons">3d_rotation</i>}
      />
      </CardActions>
      <CardText expandable>
        <p>{address}</p>
        <p>{monitorStatus}</p>
      </CardText>
    </Card>
  );
}
export default muiThemeable()(observer(SearchItem));


