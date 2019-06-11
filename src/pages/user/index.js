import React, { Component } from "react";
import { Card, Form, Button, Input } from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import ETable from "../../components/ETable";
import BaseForm from "../../components/BaseForm";
const FormItem = Form.Item;
class User extends Component {
  state={
    list:[]
  }
  params = {
    page: 1
  };
  formList = [
    {
      type: "INPUT",
      label: "用户名",
      field: "user_name",
      width: 100,
      placeholder: "请输入用户名"
    },
    {
      type: "INPUT",
      label: "手机号",
      field: "user_mobile",
      placeholder: "请输入手机号",
      width: 100
    },
    {
      type: "DATE",
      label: "入职日期",
      field: "user_date",
      width: 100,
      placeholder: "请输入日期"
    }
  ];
  // 请求表格数据
  requestList = () => {
    let _this = this;
    axios.requestList(_this, "/table/list1", this.params);
  };
  handerFilter = params => {
    this.params = params;
    this.requestList();
  };
  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "状态",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "进行中" : "行程结束";
        }
      },
      {
        title: "爱好",
        dataIndex: "interset",
      },
      {
        title: "生日",
        dataIndex: "birthday",
        render(total_time) {
          return total_time;
        }
      },
      {
        title: "联系地址",
        dataIndex: "address",
      },
      {
        title: "早期时间",
        dataIndex: "time",
        render: Utils.formateDate
      }      
    ];
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handerFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.openDetail}>
            订单详情
          </Button>
          <Button type="primary" onClick={this.handerFinsh}>
            结束订单
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            updataSelectItem={Utils.updataSelectItem.bind(this)}
            selectItem={this.state.selectedItem}
          />
        </div>
      </div>
    );
  }
}

export default User;
