import React, { Component } from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "./../../axios/index";
import Item from "antd/lib/list/Item";
import Utils from "./../../utils/utils";
class BaseTable extends Component {
  state = {};
  params = {
    page: 1
  };
  componentDidMount() {
    const dataSource = [
      {
        id: 1,
        userName: "夏明",
        sex: 2,
        state: 1,
        interest: 3,
        birthday: "2019-06-03",
        address: "北京市朝阳区望京SOHO"
      },
      {
        id: 2,
        userName: "夏1明",
        sex: 1,
        state: 1,
        interest: 3,
        birthday: "2019-06-03",
        address: "北京市朝阳区望京SOHO"
      }
    ];
    dataSource.map((itme, index) => {
      itme.key = index;
    });
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
            dataSource2: res.result.list,
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
  // 选中行进行操作
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
    Modal.info({
      title: "信息",
      content: record.userName
    });
  };
  // 多选框选中行
  onRowCheckClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };
  // 删除表格数据
  handerDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    console.log(rows);
    if (rows != null) {
      rows.map(item => {
        ids.push(item.id);
      });
    } else {
      return rows;
    }
    Modal.confirm({
      title: "删除提示",
      content: "确认要删除吗？",
      onOk: () => {
        message.success("删除成功");
        this.request();
      },
      onCancel: () => {}
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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys
    };
    const rowCheckSelection = {
      type: "checkbox",
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = [];
        selectedRows.map(item => {
          ids.push(item.id);
        });
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };
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
        <Card title="单选" style={{ margin: "10px 0" }}>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            bordered
            dataSource={this.state.dataSource2}
          />
        </Card>
        <Card title="多选框" style={{ margin: "10px 0" }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handerDelete}>删除</Button>
          </div>
          <Table
            columns={columns}
            rowSelection={rowCheckSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowCheckClick(record, index);
                }
              };
            }}
            bordered
            dataSource={this.state.dataSource2}
          />
        </Card>
        <Card title="表格分页" style={{ margin: "10px 0" }}>          
          <Table
            columns={columns}           
            bordered
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}

export default BaseTable;
