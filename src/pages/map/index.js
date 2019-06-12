import React, { Component } from "react";
import { Card, Form, Button } from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import BaseForm from "../../components/BaseForm";
const FormItem = Form.Item;
class BikeMap extends Component {
  state = {
    total_count: 0
  };
  map = "";
  formList = [
    {
      type: "城市",
      width: 100,
      placeholder: "全部"
    },
    {
      type: "时间查询"
    },
    {
      type: "SELECT",
      label: "订单状态",
      placeholder: "全部",
      field: "order_status",
      initialValue: "0",
      width: 100,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "进行中" },
        { id: "2", name: "结束行程" }
      ]
    }
  ];
  // 请求表格数据
  requestList = () => {
    axios
      .ajax({
        url: "/map/bike_list",
        data: { params: this.params }
      })
      .then(res => {
        if (res.code == "0") {
          this.setState({
            total_count: res.result.total_count
          });
          this.renderMap(res);
        }
      });
  };
  componentDidMount() {
    this.requestList();
  }
  handerFilter = params => {
    this.params = params;
    this.requestList();
  };
  // 加载地图
  renderMap = res => {
    let list = res.result.route_list;
    // 绘制地图
    this.map = new window.BMap.Map("container");
    let gps1 = list[0].split(",");
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(",");
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
    this.map.centerAndZoom(endPoint, 11);
    // 结束绘制地图
    // 起点图标
    let start = new window.BMap.Icon(
      "/assets/start_point.png",
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    let startMarker = new window.BMap.Marker(startPoint, { icon: start });
    // 将起点加载到图层中
    this.map.addOverlay(startMarker);
    // 终点图标
    let end = new window.BMap.Icon(
      "/assets/end_point.png",
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    let endMarker = new window.BMap.Marker(endPoint, { icon: end });
    // 将终点加载到图层中
    this.map.addOverlay(endMarker);
    let routerList = [];
    list.forEach(item => {
      let p = item.split(",");
      routerList.push(new window.BMap.Point(p[0], p[1]));
    });
    let polyLine = new window.BMap.Polyline(routerList, {
      strokeColor: "#ef4136",
      strokeWeight: 2,
      strokeOpacity: 1
    });
    // 将服务区范围加载到图层中
    this.map.addOverlay(polyLine);
    let servicePointList = [];
    let serverList = res.result.service_list;
    serverList.forEach(item => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat));
    });
    let polyServerLine = new window.BMap.Polyline(servicePointList, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1
    });
    // 将服务区内的所有车辆加载到图层中
    this.map.addOverlay(polyServerLine);
    // 添加服务区内的所有车
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMap.Icon(
      "/assets/bike.jpg",
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    bikeList.forEach(item => {
      let p = item.split(",");
      let points = new window.BMap.Point(p[0], p[1]);
      let marker = new window.BMap.Marker(points, { icon: bikeIcon });
      // 将车辆的坐标加载到图层中
      this.map.addOverlay(marker);
    });
  };
  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handerFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: 500 }} />
        </Card>
      </div>
    );
  }
}

export default BikeMap;
