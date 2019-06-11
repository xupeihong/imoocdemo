import React, { Component } from "react";
import Utils from "../../utils/utils";
import { Table } from "antd";
class ETable extends Component {
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection == "checkbox") {
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectItem = this.props.selectItem;
      let selectedIds = this.props.selectedIds;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i == -1) {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectItem = [record];
      }
      this.props.updataSelectItem(selectedRowKeys, selectItem,selectedIds);
    } else {
      let selectedRowKeys = [index];
      let selectItem = record;
      this.props.updataSelectItem(selectedRowKeys, selectItem);
    }
  };
  tableInit = () => {
    let rows = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.handerChange
    };
    if (rows === false || rows === null) {
      rows = false;
    } else if (rows == "checkbox") {
      rowSelection.type = "checkbox";
    } else {
      rows = "radio";
    }
    return (
      <Table
        bordered
        {...this.props}
        rowSelection={rows ? rowSelection : null}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (!rows) {
                return;
              }
              this.onRowClick(record, index);
            }
          };
        }}
      />
    );
  };
  render() {
    return <div>{this.tableInit()}</div>;
  }
}

export default ETable;
