import React, { Component } from "react";
import { Card } from "antd";
import echartTheme from "./../echartTheme";
// 按需加载
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/markPoint";
import ReactEchart from "echarts-for-react";
// 导入柱状图
import "echarts/lib/chart/bar";
class Bar extends Component {
  componentWillMount() {
    echarts.registerTheme("Imooc", echartTheme);
  }
  getOption = () => {
    let option = {
      title: { text: "用户骑行订单" },
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "订单量",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    return option;
  };
  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["ofo", "摩拜", "小蓝"]
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "ofo",
          type: "bar",
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ]
        },
        {
          name: "摩拜",
          type: "bar",
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]
        },
        {
          name: "小蓝",
          type: "bar",
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ]
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
        <Card title="柱状图表2" style={{ marginTop: 10 }}>
          <ReactEchart
            option={this.getOption2()}
            theme="Imooc"
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}

export default Bar;
