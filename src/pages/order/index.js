import React, { Component } from "react";
import {
  Card,
  Button,
  Form,
  Select,
  Table,
  DatePicker,
  Modal,
  message
} from "antd";
import axios from "./../../axios";
import Utils from "./../../utils/utils";
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends Component {
  state = {
    list: [],
    orderInfo: {},
    orderVisible: false
  };
  params = {
    page: 1
  };
  // 请求表格数据
  requestList = () => {
    let _this = this;
    axios
      .ajax({
        url: "/order/list",
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        this.setState({
          list: res.result.item_list.map((item, index) => {
            item.key = index;
            return item;
          }),
          pagination: Utils.pagination(res, current => {
            _this.params.page = current;
            _this.requestList();
          })
        });
      });
  };
  componentDidMount() {
    this.requestList();
  }
  handerFinsh = () => {
    axios
      .ajax({
        url: "/order/ebike_info",
        data: { params: 1 }
      })
      .then(res => {
        if (res.code == 0) {
          this.setState({
            orderVisible: true,
            orderInfo: res.result
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
        if (res.code == 0) {
          message.success("订单结束成功！");
          this.setState({
            orderVisible: false
          });
          this.requestList();
        }
      });
  };
  render() {
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
        dataIndex: "distance"
      },
      {
        title: "行驶时长",
        dataIndex: "total_time"
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
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary">订单详情</Button>
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

class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city_id")(
            <Select placeholder="全部" style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">武汉市</Option>
              <Option value="3">长沙市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator("start_time")(
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择"
            />
          )}
          {getFieldDecorator("end_time")(
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择"
              style={{ marginLeft: 5 }}
            />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator("status")(
            <Select placeholder="全部" style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">进行中(临时锁车)</Option>
              <Option value="3">行程结束</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
