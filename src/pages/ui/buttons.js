import React, { Component } from "react";
import { Card, Button, Icon, Radio } from "antd";
import "./ui.less";
class Buttons extends Component {
  state = {
    loading: true,
    size: "small"
  };
  handerCancel() {
    console.log(this.index);
    this.setState({
      loading: false
    });
  }
  handerChange(e) {
    this.setState({
      size: e.target.value
    });
  }
  render() {
    return (
      <div>
        <Card title="基础按钮">
          <Button type="primary">imooc</Button>
          <Button>imooc</Button>
          <Button type="dashed">imooc</Button>
          <Button type="danger">imooc</Button>
          <Button disabled>imooc</Button>
        </Card>
        <Card title="图形按钮">
          <Button icon="plus">添加</Button>
          <Button icon="edit">编辑</Button>
          <Button type="dashed" icon="delete">
            删除
          </Button>
          <Button type="danger" shape="circle" icon="search" />
          <Button type="danger" icon="search">
            搜索
          </Button>
          <Button icon="download">下载</Button>
        </Card>
        <Card title="Loading按钮">
          <Button icon="plus" type="primary" loading={this.state.loading}>
            确定
          </Button>
          <Button icon="edit" shape="circle" loading={this.state.loading} />
          <Button icon="download" loading={this.state.loading}>
            点击下载
          </Button>
          <Button icon="download" loading={this.state.loading} />
          <Button
            icon="download"
            type="primary"
            onClick={this.handerCancel.bind(this)}
          >
            关闭
          </Button>
        </Card>
        <Card title="按钮组">
          <Button.Group size="small">
            <Button type="primary" icon="left">
              返回
            </Button>
            <Button type="primary" icon="right">
              前进
            </Button>
          </Button.Group>
        </Card>
        <Card title="按钮大小">
          <Radio.Group>
            <Radio value="small" onChange={this.handerChange.bind(this)}>
              小
            </Radio>
            <Radio value="middle" onChange={this.handerChange.bind(this)}>
              中
            </Radio>
            <Radio value="large" onChange={this.handerChange.bind(this)}>
              大
            </Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>
            返回
          </Button>
          <Button size={this.state.size}>imooc</Button>
          <Button type="primary" size={this.state.size}>
            前进
          </Button>
        </Card>
      </div>
    );
  }
}
export default Buttons;
