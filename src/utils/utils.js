import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;
export default {
  // 时间格式化
  formateDate(time) {
    if (!time) return "";
    let date = new Date(time);
    let month =
      date.getMonth() + 1 >= 10 ? date.getMonth() : "0" + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    let getSeconds =
      date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return (
      date.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      "-" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      getSeconds
    );
  },
  // 分页
  pagination(data, callback) {
    let page = {
      onChange: current => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`;
      }
    };
    return page;
  },
  // 封装下拉选项
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = [];
    data.map(item => {
      options.push(
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      );
    });
    return options;
  },
  // 单选或多选，选中的数据
  updataSelectItem(keys, items,selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys: keys,
        selectedItem: items,
        selectedIds
      });
    } else {
      this.setState({
        selectedRowKeys: keys,
        selectedItem: items,
      });
    }
    
  }
};
