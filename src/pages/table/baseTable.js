import React, { Component } from "react";
import { Card, Table } from "antd";
import axios from "./../../axios/index";
import Item from "antd/lib/list/Item";
import Utils from './../../utils/utils';
class BaseTable extends Component {
  state = {};
  params = {
    page:1
}
  componentDidMount() {
    const dataSource = [
      {
        id: 0,
        userName: "夏明",
        sex: 2,
        state: 1,
        interest: 3,
        birthday: "2019-06-03",
        address: "北京市朝阳区望京SOHO"
      },
      {
        id: 1,
        userName: "夏1明",
        sex: 1,
        state: 1,
        interest: 3,
        birthday: "2019-06-03",
        address: "北京市朝阳区望京SOHO"
      }
    ];
    this.setState({
      dataSource
    });
    this.request();
  }
  request = () => {
    let _this = this;
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: { page: this.params.page }
        }
      })
      .then(res => {
        if (res.code == 0) {
          res.result.map((itme, index) => {
            itme.key = index;
          });
          this.setState({
            dataSource2: res.result,
            selectedRowKeys: [],
            selectedRows: null,
            // pagination: Utils.pagination(res, current => {
            //   _this.params.page = current;
            //   this.request();
            // })
          });
        }
      });
  };
  render() {
    const columns = [
      {
        title: "id",
        key: "id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName"
      },
      {
        title: "性别",
        key: "sex",
        dataIndex: "sex",
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        key: "state",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        key: "interest",
        dataIndex: "interest",
        render(abc) {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "踢足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          };
          return config[abc];
        }
      },
      {
        title: "生日",
        key: "birthday",
        dataIndex: "birthday"
      },
      {
        title: "地址",
        key: "address",
        dataIndex: "address"
      }
    ];

    return (
      <div>
        <Card title="基础表格">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource}
          />
        </Card>
        <Card title="动态表格数据渲染" style={{ margin: "10px 0" }}>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource2}
          />
        </Card>
      </div>
    );
  }
}

export default BaseTable;
