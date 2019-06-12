import React, { Component } from "react";
import echartTheme from "./../themeLight";
// 按需加载
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/markPoint";
import ReactEchart from "echarts-for-react";
import { Card } from "antd";
class Line extends Component {
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
        trigger: "axis"
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
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
          type: "line",
          radius: "55%",
          center: ["50%", "50%"],
          data: [1200, 1500, 1700, 1900, 1000, 4200, 2200],
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
        text: "折线图堆叠"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    return option;
  };
  getOption3 = () => {
    let option = {
      title: {
        text: "堆叠区域图"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "搜索引擎",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    return option;
  };
  render() {
    return (
      <div>
        <Card title="折线图">
          <ReactEchart
            option={this.getOption()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="折线图2">
          <ReactEchart
            option={this.getOption2()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="折线图3">
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

export default Line;
