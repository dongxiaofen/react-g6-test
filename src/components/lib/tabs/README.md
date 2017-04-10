## 用法介绍

  example:

  <Tabs className={styles.test}>
    <TabPane tab="第一个" disabled title="test">1</TabPane>
    <TabPane className={styles.test} tab="第二个">2</TabPane>
    <TabPane tab="第三个" reMountEveryTime>3</TabPane>
  </Tabs>

  Tabs：
    defaultActiveKey number
    tab的默认active项，从1开始，表示当前默认显示项为第一个tab的内容，注意：当默认项设置有none或者disabled等属性时，会自动加1

    className string
    用户自定义tab选项的样式 会覆盖tab选项原有的样式

    children node
    只能是TabPane组件或TabPane组件集合

  TabPane：
    className string
    用户自定义内容框的样式 会覆盖原有的样式

    disabled bool
    禁用该选项

    title string
    禁用该选项时鼠标hover后的提示信息

    reMountEveryTime bool
    当内容是echarts图表时需要用reMountEveryTime属性 否则echarts不能正常获取宽高，原理是重新加载该内容，而不是设置dispaly属性
