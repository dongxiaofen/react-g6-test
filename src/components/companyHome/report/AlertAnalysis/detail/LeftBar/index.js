import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function LeftBar({}) {
  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="left"
      style={{ height: 220 }}>
      <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
      <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
      <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
      <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
      <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
      <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
      <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
      <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
      <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
    </Tabs>
  );
}

LeftBar.propTypes = {
  foo: PropTypes.string,
};
export default observer(LeftBar);
