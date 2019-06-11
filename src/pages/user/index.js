import React, { Component } from "react";
import {
  Card,
  Form,
  Button,
  Input,
  Modal,
  Radio,
  Select,
  DatePicker
} from "antd";
import axios from "./../../axios";
import Utils from "../../utils/utils";
import ETable from "../../components/ETable";
import BaseForm from "../../components/BaseForm";
import moment from "moment";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
class User extends Component {
  state = {
    list: [],
    isVisible: false
  };
  params = {
    page: 1
  };
  formList = [
    {
      type: "INPUT",
      label: "用户名",
      field: "user_name",
      width: 150,
      placeholder: "请输入用户名"
    },
    {
      type: "INPUT",
      label: "手机号",
      field: "user_mobile",
      placeholder: "请输入手机号",
      width: 150
    },
    {
      type: "DATE",
      label: "入职日期",
      field: "user_date",
      width: 100,
      placeholder: "请输入日期"
    }
  ];
  componentDidMount() {
    this.requestList();
  }
  // 请求表格数据
  requestList = () => {
    let _this = this;
    axios.requestList(_this, "/user/list", this.params);
  };
  // 表格模板过滤
  handerFilter = params => {
    this.params = params;
    this.requestList();
  };
  handerOperate = operate => {
    let item = this.state.selectedItem;
    switch (operate) {
      case "Add":
        this.setState({
          operate,
          isVisible: true,
          title: "新增员工"
        });
        break;
      case "edit":
        console.log(item);
        if (!item) {
          Modal.info({
            title: "提示",
            content: "请选择一个用户"
          });
          return;
        }
        this.setState({
          operate,
          isVisible: true,
          title: "编辑员工",
          userInfo: item
        });
        break;
        case "detail":           
            if (!item) {
              Modal.info({
                title: "提示",
                content: "请选择一个用户"
              });
              return;
            }
            this.setState({
              operate,
              isVisible: true,
              title: "员工详情",
              userInfo: item
            });
            break;
            case "delete":
                if (!item) {
                  Modal.info({
                    title: "提示",
                    content: "请选择一个用户"
                  });
                  return;
                }
                let _this=this;
                Modal.confirm({
                  title:'确认删除',
                  content:'是否删除此员工？',
                  onOk(){
                    axios.ajax({
                      url:'/user/delete',
                      data:{
                        params:{id:item.id}
                      }
                    }).then((res)=>{
                        if (res.code=='0') {
                          _this.setState({                            
                            isVisible: false,                            
                          });
                          _this.requestList();
                        }
                    })
                  }
                })      
        break;
      default:
        break;
    }
  };
  handerSubmit = () => {
    let type = this.state.operate;
    let data = this.userForm.props.form.getFieldsValue();
    axios
      .ajax({
        url: type == "Add" ? "/user/add" : "/user/edit",
        data: {
          params: data
        }
      })
      .then(res => {
        if (res.result === "Ok") {
          this.userForm.props.form.resetFields();
          this.setState({ isVisible: false });
          this.requestList();
        }
      });
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
        dataIndex: "sex",
        render(status) {
          return status === 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          return {
            "1": "咸鱼",
            "2": "浪子",
            "3": "无聊",
            "4": "寂寞",
            "5": "CTO",
            "6": "CEO",
            "7": "AEO",
            "8": "AEO1",
            "9": "AEO2"
          }[state];
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render(interest) {
          return {
            "1": "吃",
            "2": "玩",
            "3": "睡",
            "4": "游戏",
            "5": "音乐",
            "6": "吃鸡",
            "7": "LOL",
            "8": "cf"
          }[interest];
        }
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
        dataIndex: "address"
      },
      {
        title: "早起时间",
        dataIndex: "time"
      }
    ];
    let footer='';
    if (this.state.operate=='detail') {
      footer={
        footer:null
      }
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handerFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.handerOperate("Add")}
          >
            新增员工
          </Button>
          <Button
            type="primary"
            icon="edit"
            onClick={() => this.handerOperate("edit")}
          >
            编辑员工
          </Button>
          <Button
            type="primary"
            icon="unordered-list"
            onClick={() => this.handerOperate("detail")}
          >
            员工详情
          </Button>
          <Button
            type="primary"
            icon="delete"
            onClick={() => this.handerOperate("delete")}
          >
            删除员工
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            updataSelectItem={Utils.updataSelectItem.bind(this)}
            selectedItem={this.state.selectedItem}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handerSubmit}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({ isVisible: false });
          }}
          width={600}
          {...footer}
        >
          <UserForm
            type={this.state.operate}
            wrappedComponentRef={inst => {
              this.userForm = inst;
            }}
            userInfo={this.state.userInfo}
          />
        </Modal>
      </div>
    );
  }
}

export default User;

class UserForm extends React.Component {
  getUserState=(state)=>{
  return{  "1": "咸鱼",
    "2": "浪子",
    "3": "无聊",
    "4": "寂寞",
    "5": "CTO",
    "6": "CEO",
    "7": "AEO",
    "8": "AEO1",
    "9": "AEO2"}[state]
  }
  render() {
    let type = this.props.type;
    let userInfo = this.props.userInfo || {};
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="用户名" {...formItemLayout}>
          {
            type=='detail'?userInfo.username:
            getFieldDecorator("user_name", {
            initialValue: userInfo.username
          })(<Input type="text" placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          { type=='detail'?userInfo.sex==1?'男':'女':
            getFieldDecorator("sex", {
            initialValue: userInfo.sex
          })(
            <RadioGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          { type=='detail'?this.getUserState(userInfo.state):
            getFieldDecorator("state", {
            initialValue: userInfo.state
          })(
            <Select placeholder="请选择">
              <Option value={1}>咸鱼</Option>
              <Option value={2}>浪子</Option>
              <Option value={3}>无聊</Option>
              <Option value={4}>寂寞</Option>
              <Option value={5}>CTO</Option>
              <Option value={6}>CEO</Option>
              <Option value={7}>AEO</Option>
              <Option value={8}>AEO1</Option>
              <Option value={9}>AEO2</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          { type=='detail'?userInfo.birthday:
            getFieldDecorator("birthday", {
            initialValue: moment(userInfo.birthday)
          })(<DatePicker placeholder="请选择生日" showTime={true} />)}
        </FormItem>
        <FormItem label="地址" {...formItemLayout}>
          { type=='detail'?userInfo.address:
            getFieldDecorator("address", {
            initialValue: userInfo.address
          })(<TextArea rows={4} placeholder="请输入联系地址" />)}
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create()(UserForm);
