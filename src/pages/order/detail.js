import React, { Component } from "react";
import { Card, Form } from "antd";
import axios from "./../../axios";
const FormItem = Form.Item;
class Detail extends Component {
  render() {
    return (
      <div>
        <Card>
          <div id="orderDetailMap" />
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form" />
          </div>
        </Card>
      </div>
    );
  }
}
export default Detail;
