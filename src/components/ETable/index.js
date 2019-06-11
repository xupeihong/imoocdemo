import React, { Component } from "react";
import Utils from "../../utils/utils";
import { Table } from "antd";
class ETable extends Component {
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection == "checkbox") {
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem;
      let selectedIds = this.props.selectedIds;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i == -1) {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      this.props.updataSelectItem(selectedRowKeys, selectedItem,selectedIds);
    } else {
      let selectedRowKeys = [index];
      let selectedItem = record;
      this.props.updataSelectItem(selectedRowKeys, selectedItem);
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
