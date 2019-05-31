import React, { Component } from "react";
import "./ui.less";
import { Card, Button, Radio, notification } from "antd";
class Notification extends Component {
    handerClick=(type,direction)=>{
    if (direction) {
        notification.config({
            placement:direction
          })
    }
    notification[type]({
        message: "提示信息",
        description: "描述的内容" 
    })
  }
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-warp">
          <Button type="primary" onClick={()=>this.handerClick('success','topLeft')}>
            success
          </Button>
          <Button type="primary" onClick={()=>this.handerClick('info','topRight')}>
            info
          </Button>
          <Button type="primary" onClick={()=>this.handerClick('warning','bottomLeft')}>
            warning
          </Button>
          <Button type="primary" onClick={()=>this.handerClick('error','bottomRight')}>
            error
          </Button>
        </Card>
      </div>
    );
  }
}

export default Notification;
