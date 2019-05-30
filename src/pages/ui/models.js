import React, { Component } from "react";
import "./ui.less";
import { Modal, Button, Card } from "antd";
const confirm = Modal.confirm;
class Models extends Component {
  showbox() {
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  render() {
    return (
      <div>
        <Card title="基础模态框" className='warp'>
          <Button type="primary" onClick={this.showbox.bind(this)}>
            确认
          </Button>
          <Button type="primary" onClick={this.showbox.bind(this)}>
            自定义弹窗
          </Button>
          <Button type="primary" onClick={this.showbox.bind(this)}>
            顶部20px
          </Button>
          <Button type="primary" onClick={this.showbox.bind(this)}>
            水平垂直居中
          </Button>
        </Card>
        <Card title="信息确认框" className='warp'>
          <Button type="primary">confirm</Button>
          <Button type="info">info</Button>
          <Button type="success">success</Button>
          <Button type="primary">warm</Button>
        </Card>
      </div>
    );
  }
}

export default Models;
