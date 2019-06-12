import React, { Component } from "react";
import echartTheme from "./../themeLight";
// 按需加载
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/markPoint";
import ReactEchart from "echarts-for-react";
import { Card } from "antd";
class Pie extends Component {
  componentWillMount() {
    echarts.registerTheme("Imooc", echartTheme);
  }
  getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        subtext: "纯属虚构",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 1200, name: "周一" },
            { value: 1500, name: "周二" },
            { value: 1700, name: "周三" },
            { value: 1900, name: "周四" },
            { value: 1000, name: "周五" },
            { value: 4200, name: "周六" },
            { value: 2200, name: "周日" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    return option;
  };
  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        subtext: "纯属虚构",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          radius: ["55%", "70%"],
          center: ["50%", "50%"],
          data: [
            { value: 1200, name: "周一" },
            { value: 1500, name: "周二" },
            { value: 1700, name: "周三" },
            { value: 1900, name: "周四" },
            { value: 1000, name: "周五" },
            { value: 4200, name: "周六" },
            { value: 2200, name: "周日" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    return option;
  };
  getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        subtext: "纯属虚构",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          radius: ["55%", "70%"],
          center: ["50%", "50%"],
          data: [
            { value: 1200, name: "周一" },
            { value: 1500, name: "周二" },
            { value: 1700, name: "周三" },
            { value: 1900, name: "周四" },
            { value: 1000, name: "周五" },
            { value: 4200, name: "周六" },
            { value: 2200, name: "周日" }
          ].sort((a, b) => {
            return a.value - b.value;
          }),
          roseType: "radius",
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    return option;
  };
  render() {
    return (
      <div>
        <Card title="柱状图表1">
          <ReactEchart
            option={this.getOption()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="环形图">
          <ReactEchart
            option={this.getOption2()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="环形图3">
          <ReactEchart
            option={this.getOption3()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
export default Pie;
