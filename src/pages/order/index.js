import React, { Component } from "react";
import { Card, Button, Form, Table, Modal, message } from "antd";
import axios from "./../../axios";
import Utils from "./../../utils/utils";
import BaseForm from "../../components/BaseForm";
const FormItem = Form.Item;
export default class Order extends Component {
  state = {
    list: [],
    orderInfo: {},
    orderVisible: false
  };
  params = {
    page: 1
  };
  formList = [
    {
      type: "SELECT",
      label: "城市",
      placeholder: "全部",
      initialValue: "0",
      field: "city_id",
      width: 100,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "北京" },
        { id: "2", name: "武汉" },
        { id: "3", name: "四川" }
      ]
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
    let _this = this;
    axios.requestList(this,'/order/list',this.params)    
  };
  componentDidMount() {
    this.requestList();
  }
  handerFilter = params => {
    this.params = params;
    this.requestList();
  };
  handerFinsh = () => {
    console.log(this.state.selectedItem);
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "请选择一条订单进行结束"
      });
      return;
    }
    axios
      .ajax({
        url: "/order/ebike_info",
        data: { params: 1 }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            orderVisible: true
            // orderInfo: res.result
          });
        }
      });
  };
  // 确定结束订单
  handerOK = () => {
    axios
      .ajax({
        url: "/order/finish_order",
        data: {
          params: 1
        }
      })
      .then(res => {
        if (res.code === 0) {
          message.success("订单结束成功！");
          this.setState({
            orderVisible: false,
            selectedItem: null,
            selectedRowKeys: []
          });
          this.requestList();
        }
      });
  };
  // 选中行进行操作
  onRowClick = (record, index) => {
    console.log(record);
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
      orderInfo: {
        bike_sn: record.bike_sn,
        battery: record.key,
        start_time: record.start_time,
        location: record.user_name
      }
    });
  };
  // 跳转订单详情页面
  openDetail = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: "信息",
        content: "请选择一条订单"
      });
      return;
    }
    window.open(
      `/#/common/order/detail/${this.state.selectedItem.id}`,
      "_blank"
    );
  };
  render() {
    const { selectedRowKeys } = this.state;
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn"
      },
      {
        title: "车辆编号",
        dataIndex: "bike_sn"
      },
      {
        title: "用户名",
        dataIndex: "user_name"
      },
      {
        title: "手机号码",
        dataIndex: "mobile"
      },
      {
        title: "里程",
        dataIndex: "distance",
        render(distance) {
          return distance / 1000 + "KM";
        }
      },
      {
        title: "行驶时长",
        dataIndex: "total_time",
        render(total_time) {
          return total_time;
        }
      },
      {
        title: "状态",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "进行中" : "行程结束";
        }
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
        render: Utils.formateDate
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
        render: Utils.formateDate
      },
      {
        title: "订单金额",
        dataIndex: "total_fee"
      },
      {
        title: "实付金额",
        dataIndex: "user_pay"
      }
    ];
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const rowSelection = {
      type: "radio",
      selectedRowKeys
    };
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
          <Table
            columns={columns}
            bordered
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderVisible}
          onCancel={() => {
            this.setState({
              orderVisible: false
            });
          }}
          onOk={this.handerOK}
          width={600}
        >
          <Form>
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + "%"}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
