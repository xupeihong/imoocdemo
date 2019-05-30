import React, { Component } from "react";
import { Spin, Card, Button, Icon, Alert } from "antd";
import './ui.less'
class Loadings extends Component {
  render() {
    return (
      <div>
        <Card title="spin用法" className="card-warp">
          <Spin  size='small'></Spin>
          <Spin></Spin>
          <Spin size='large'></Spin>
        </Card>
      </div>
    );
  }
}

export default Loadings;
