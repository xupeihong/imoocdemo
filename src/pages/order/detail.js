import React, { Component } from "react";
import { Card, Form } from "antd";
import axios from "./../../axios";
import "./detail.less";
const FormItem = Form.Item;
class Detail extends Component {
  state = {
    orderInfo: {}
  };
  componentDidMount() {
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }
  getDetailInfo = orderId => {
    axios
      .ajax({
        url: "/order/detail",
        data: {
          params: {
            orderId: orderId
          }
        }
      })
      .then(res => {
        if (res.code == 0) {
          console.log(res.result);
          this.setState({
            orderInfo: res.result
          });
          this.renderMap(res.result);
        }
      });
  };
  renderMap = result => {
    this.map = new window.BMap.Map("orderDetailMap");
    this.map.centerAndZoom("北京", 11);
    this.addMapControl();
    this.drawBikeMap(result.position_list);
    this.drawServiceArea(result.area);
  };
  drawBikeMap = position_list => {
    let map = this.map;
    let startPoint = "";
    let endPoint = "";
    if (position_list.length > 0) {
      let arr = position_list[0];
      startPoint = new window.BMap.Point(arr.lon, arr.lat);
      let srartIcon = new window.BMap.Icon(
        "/assets/start_point.png",
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(36, 42)
        }
      );
      // 开始的标记点
      let startMarker = new window.BMap.Marker(startPoint, { icon: srartIcon });
      map.addOverlay(startMarker);
      endPoint = new window.BMap.Point(
        position_list[position_list.length - 1].lon,
        position_list[position_list.length - 1].lat
      );
      // 结束图标
      let endIcon = new window.BMap.Icon(
        "/assets/end_point.png",
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(36, 42)
        }
      );
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
      map.addOverlay(endMarker);
      // 链接轨迹线路图
      let trackPoint = [];
      for (let i = 0; i < position_list.length; i++) {
        let point = position_list[i];
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      }
      // 线路图
      let line = new window.BMap.Polyline(trackPoint, {
        strokeColor: "#1869AD",
        strokeWeight: 3,
        strokeOpacity: 1
      });
      map.addOverlay(line);
      map.centerAndZoom(endPoint, 11);
    }
  };
  // 绘制服务区方法
  drawServiceArea = area => {
    let trackPoint = [];
    let map = this.map;

    for (let i = 0; i < area.length; i++) {
      let point = area[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }
    // 绘制服务区
    let ployGon = new window.BMap.Polygon(trackPoint, {
      strokeColor: "#ce0000",
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: "#ff8605",
      fillOpacity: 0.5
    });
    map.addOverlay(ployGon);
  };
  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    var top_left_control = new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_LEFT
    }); // 左上角，添加比例尺
    var top_left_navigation = new window.BMap.NavigationControl(); //左上角，添加默认缩放平移控件
    var top_right_navigation = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT,
      type: window.BMAP_NAVIGATION_CONTROL_SMALL
    }); //右上角，仅包含平移和缩放按钮
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);
  };
  render() {
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map" />
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.mode == 1
                    ? "指定停车点模式"
                    : "禁停区模式"}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.order_sn}
                </div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.bike_sn}
                </div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.user_name}
                </div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.mobile}
                </div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.start_location}
                </div>
              </li>
              <li>
                <div className="detail-form-left">行驶终点</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.end_location}
                </div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.distance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
export default Detail;
