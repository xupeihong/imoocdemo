import React, { Component } from "react";
import { Spin, Card, Button, Icon, Alert } from "antd";
import "./ui.less";
class Loadings extends Component {
  render() {
    return (
      <div>
        <Card title="spin用法" className="card-warp">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
          <Spin size="large" tip="加载中...">
            <Alert message="react" description="学习中" type="warning" />
          </Spin>
        </Card>
      </div>
    );
  }
}

export default Loadings;
