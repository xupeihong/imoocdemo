import React, { Component } from "react";
import "./ui.less";
import { Tabs, Card, message, Icon } from "antd";
const { TabPane } = Tabs;
class ITabs extends Component {
  newTabIndex=0;
  componentWillMount() {
    this.newTabIndex = 0;
    const panes = [
      { title: "Tab 1", content: "Content of Tab 1", key: "1" },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" },
      {
        title: "Tab 3",
        content: "Content of Tab 3",
        key: "3",
        closable: false
      }
    ];
    this.setState({
      panes,
      activeKey:panes[0].key
    });
  }
  handerCall = key => {
    message.info("点击了" + key);
  };
  handerchange = activeKey => {
    this.setState({
      activeKey
    });
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
//   添加
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "New Tab"+this.newTabIndex,
      content: "Content of new Tab"+this.newTabIndex,
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };
//   移除
  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  render() {
    return (
      <div>
        <Card title="tab标签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.handerCall}>
            <TabPane tab="Tab 1" key="1">
              react框架
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              vue框架
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              iview组件
            </TabPane>
          </Tabs>
        </Card>
        <Card title="有图标的标签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.handerCall}>
            <TabPane
              tab={
                <span>
                  <Icon type="apple" />
                  标签1
                </span>
              }
              key="1"
            >
              react框架
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  标签2
                </span>
              }
              key="2"
            >
              vue框架
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="delete" />
                  标签3
                </span>
              }
              key="3"
            >
              iview组件
            </TabPane>
          </Tabs>
        </Card>
        <Card title="动态标签" className="card-warp">
          <Tabs            
            onChange={this.handerchange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(pane => {
             return <TabPane key={pane.key} tab={pane.title} closable={pane.closable}>
                  {pane.content}
              </TabPane>
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default ITabs;
