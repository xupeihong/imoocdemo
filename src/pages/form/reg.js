import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Checkbox,
  Radio,
  Select,
  Switch,
  Button,
  DatePicker,
  TimePicker,
  Icon,
  InputNumber,
  message,
  Upload
} from "antd";
import moment from "moment";
const FormItem = Form.Item;
const { Option } = Select;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Reg extends Component {
  state = {
    loading: false
  };
  beforeUpload = file => {
    const isJPG = file.type === "image/png";
    if (!isJPG) {
      message.error("你只能上传jpg格式的图片!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过2MB!");
    }
    return isJPG && isLt2M;
  };
  handerSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo));
    message.success(
      `${userInfo.user} 恭喜你，您通过本次表单组件学习，当前密码为：${
        userInfo.pwd
      }`
    );
  };

  handeChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <Card title="注册页面">
          <Form onSubmit={this.handerSubmit} layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator("user", {
                rulus: [
                  {
                    required: true,
                    message: "用户名不能为空"
                  }
                ]
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator("pwd", {
                rulus: [
                  {
                    required: true,
                    message: "密码不能为空"
                  },
                  {
                    min: 4,
                    max: 10,
                    message: "密码必须是4-10的长度"
                  }
                ]
              })(<Input.Password placeholder="请输入密码" />)}
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator("sex", {
                initialValue: "boy"
              })(
                <Radio.Group>
                  <Radio value="boy">男</Radio>
                  <Radio value="girl">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator("old", {
                initialValue: "18"
              })(<InputNumber />)}
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {getFieldDecorator("states", {
                initialValue: "2"
              })(
                <Select placeholder="请选择">
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子一枚</Option>
                  <Option value="4">百度FE</Option>
                  <Option value="5">创业者</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {getFieldDecorator("hobby", {})(
                <Select mode="multiple" placeholder="请选择">
                  <Option value="1">游泳</Option>
                  <Option value="2">跑步</Option>
                  <Option value="3">看电影</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator("isMarry", {
                initialValue: true,
                valuePropName: "checked"
              })(<Switch />)}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator("birthday", {
                initialValue: moment(new Date())
              })(<DatePicker showTime format="YYYY-MM-DD" />)}
            </FormItem>
            <FormItem label="地址" {...formItemLayout}>
              {getFieldDecorator("address", {
                initialValue: "北京市朝阳区望京SOHO2期"
              })(<Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {getFieldDecorator("getTime", {})(
                <TimePicker placeholder="选择时间" />
              )}
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator("avtator", {})(
                <Upload
                  listType="picture-card"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  showUploadList={false}
                  onChange={this.handeChange}
                  beforeUpload={this.beforeUpload}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" width={100} height={100} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator("userImg")(
                <Checkbox>
                  我已阅读过<a href="#">安全协议</a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Reg);
