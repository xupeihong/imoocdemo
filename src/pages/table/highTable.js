import React, { Component } from "react";
import { Card, Table, Badge, Modal, message } from "antd";
import axios from "./../../axios/index";
import Utils from "./../../utils/utils";
class HighTable extends Component {
  state = {};
  params = {
    page: 1
  };
  componentDidMount() {
    const dataSource = [];
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
          res.result.list.map((itme, index) => {
            itme.key = index;
          });
          this.setState({
            dataSource: res.result.list,
            selectedRowKeys: [],
            selectedRows: null,
            pagination: Utils.pagination(res, current => {
              _this.params.page = current;
              this.request();
            })
          });
        }
      });
  };
  handerChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    });
  };
  // 删除操作
  handerDelete = item => {
    let id = item.id;
    Modal.confirm({
      title: "确认",
      content: "确认删除此数据吗?",
      onOk: () => {
        message.success("删除成功");
        this.request();
      }
    });
  };
  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        width: 80
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 80
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80,
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        width: 80,
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
        dataIndex: "interest",
        width: 80,
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
        dataIndex: "birthday",
        width: 80
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 80
      }
    ];
    const columns2 = [
      {
        title: "id",
        dataIndex: "id",
        width: 80,
        fixed: "left"
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 80,
        fixed: "left"
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName1",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName2",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName3",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName4",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName5",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName6",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName7",
        width: 80
      },
      ,
      {
        title: "用户名",
        dataIndex: "userName8",
        width: 80
      },
      ,
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName",
        width: 80
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80,
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        width: 80,
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
        dataIndex: "interest",
        width: 80,
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
        dataIndex: "birthday",
        width: 80
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 80,
        fixed: "right"
      }
    ];
    const columns3 = [
      {
        title: "id",
        dataIndex: "id",
        width: 80
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 80
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80,
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "年龄",
        dataIndex: "age",
        width: 80,
        sorter: (a, b) => {
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: "状态",
        dataIndex: "state",
        width: 80,
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
        dataIndex: "interest",
        width: 80,
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
        dataIndex: "birthday",
        width: 80
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 80
      }
    ];
    const columns4 = [
      {
        title: "id",
        dataIndex: "id",
        width: 80
      },
      {
        title: "用户名",
        dataIndex: "userName",
        width: 80
      },
      {
        title: "性别",
        dataIndex: "sex",
        width: 80,
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "年龄",
        dataIndex: "age",
        width: 80
      },
      {
        title: "状态",
        dataIndex: "state",
        width: 80,

        render(state) {
          let config = {
            "1": <Badge status="success" text="咸鱼一条" />,
            "2": <Badge status="error" text="风华浪子" />,
            "3": <Badge status="default" text="北大才子" />,
            "4": <Badge status="processing" text="百度FE" />,
            "5": <Badge status="wraning" text="创业者" />
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        width: 80,
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
        dataIndex: "birthday",
        width: 80
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 80
      },
      {
        title: "操作",
        width: 80,
        render: (text, item) => {
          return (
            <a
              href="javascript:;"
              onClick={item => {
                this.handerDelete(this, item);
              }}
            >
              删除
            </a>
          );
        }
      }
    ];
    return (
      <div>
        <Card title="头部固定">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.dataSource}
            scroll={{ y: 240 }}
          />
        </Card>
        <Card title="左侧固定">
          <Table
            columns={columns2}
            bordered
            dataSource={this.state.dataSource}
            scroll={{ x: 1288 }}
          />
        </Card>
        <Card title="排序">
          <Table
            columns={columns3}
            bordered
            dataSource={this.state.dataSource}
            onChange={this.handerChange}
          />
        </Card>
        <Card title="操作按钮">
          <Table
            columns={columns4}
            bordered
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}

export default HighTable;
