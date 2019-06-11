import React, { Component } from "react";
import { Input, Form, Select, Checkbox, Button, DatePicker } from "antd";
import Utils from "../../utils/utils";
const FormItem = Form.Item;
class FilterForm extends Component {
  handerFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  };
  // 重置
  reset = () => {
    this.props.form.resetFields();
  };
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label;
        let field = item.field;
        let initValue = item.initialValue || "";
        let placeHolder = item.placeHolder;
        let width = item.width;
        if (item.type == "时间查询") {
          const begin_time = (
            <FormItem label="订单时间" key={"st" + i}>
              {getFieldDecorator("begin_time")(
                <DatePicker
                  showTime={true}
                  format="YYYY-MM-DD"
                  placeholder={placeHolder}
                />
              )}
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            <FormItem label="~" colon={false} key={"et" + i}>
              {getFieldDecorator("end_time")(
                <DatePicker
                  showTime={true}
                  format="YYYY-MM-DD"
                  placeholder={placeHolder}
                />
              )}
            </FormItem>
          );
          formItemList.push(end_time);
        } else if (item.type == "INPUT") {
          const INPUT = (
            <FormItem label={label} key={"i" + i}>
              {getFieldDecorator([field], {
                initialValue: initValue
              })(<Input type="text" placeholder={placeHolder} />)}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type == "SELECT") {
          const SELECT = (
            <FormItem label={label} key={"ip" + i}>
              {getFieldDecorator([field], {
                initialValue: initValue
              })(
                <Select placeholder={placeHolder} style={{ width: width }} >
                  {Utils.getOptionList(item.list)}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type == "CHECKBOX") {
          const CHECKBOX = (
            <FormItem label={label} key={"ck" + i}>
              {getFieldDecorator([field], {
                initialValue: initValue,
                valuePropName: "checked"
              })(<Checkbox>{label}</Checkbox>)}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        }else if(item.type='DATE'){
          const DATE = (
            <FormItem label={label} key={"dt" + i}>
              {getFieldDecorator([field])(
                <DatePicker></DatePicker>
              )}
            </FormItem>
          );
          formItemList.push(DATE);
        }        
      });
    }
    return formItemList;
  };

  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button
            type="primary"
            style={{ margin: "0 20px" }}
            onClick={this.handerFilterSubmit}
          >
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
export default Form.create({})(FilterForm);
