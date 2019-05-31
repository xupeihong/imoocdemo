import React, { Component } from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { min } from "moment";
const FormItem = Form.Item;
class Login extends Component {
  componentDidMount() {
    // this.props.form.validateFields();
  }
  handerSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("表单数据：", values);
      }
    });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    return (
      <div>
        <Card title="登陆行内表单">
          <Form layout="inline" onSubmit={this.handerSubmit}>
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登陆</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="水平表单">
          <Form onSubmit={this.handerSubmit} style={{ width: 300 }}>
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "请输入用户名!" },
                  { min: 5, max: 10, message: "长度不够10个" }
                ],
                initialValue: ""
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("pwd", {
                rules: [{ required: true, message: "请输入密码!" }],
                initialValue: ""
              })(<Input.Password placeholder="请输入密码" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox type="primary">记住密码</Checkbox>)}
              <a href="javascript:;" style={{float:"right"}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(Login);
