import React, { Component } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Modal,
  message,
  Tree,
  Transfer,
  Switch
} from "antd";
import ETable from "../../components/ETable";
import Utils from "../../utils/utils";
import axios from "../../axios";
import menuConfig from "../../config/menuConfig";
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class Permission extends Component {
  state = {
    list: [],
    isRoleVisible: false,
    ispermission: false,
    detailInfo: {},
    isUserVisible: false
  };
  // 创建角色
  handerAddRole = () => {
    this.setState({
      isRoleVisible: true
    });
  };
  // 设置权限
  handerSetRole = () => {
    let itme = this.state.selectedItem;
    // console.log(itme.menus)
    if (!itme) {
      Modal.info({
        title: "提示",
        content: "请选择一个角色"
      });
      return;
    }
    this.setState({
      ispermission: true,
      detailInfo: itme,
      menuInfo: itme.menus
    });
  };
  // 用户授权
  handerSetUserRole = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "提示",
        content: "请选择一个角色"
      });
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    });
    this.getRoleUserList(item.id);
  };
  //获取角色下的用户
  getRoleUserList = id => {
    axios
      .ajax({
        url: "/role/user_list",
        data: { params: { id } }
      })
      .then(res => {
        if (res) {
          this.getAuthUserList(res.result);
        }
      });
  };
  getAuthUserList = dataSource => {
    const mockData = [];
    const targetData = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const datas = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };
        if (datas.status == 1) {
          targetData.push(datas.key);
        }
        mockData.push(datas);
      }
      this.setState({
        mockData,
        targetData
      });
    }
  };
  componentDidMount() {
    axios.requestList(this, "/role/list", {});
  }
  handerRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    axios
      .ajax({
        url: "role/create",
        data: { params: data }
      })
      .then(res => {
        if (res.code == 0) {
          message.success("创建成功！");
          this.setState({
            isRoleVisible: false
          });
          axios.requestList(this, "/role/list", {});
          this.roleForm.props.form.resetFields();
        }
      });
  };
  // 设置权限数据提交
  handerPermission = () => {
    let items = this.permForm.props.form.getFieldsValue();
    items.role_id = this.state.selectedItem.id;
    items.menus = this.state.menuInfo;
    axios
      .ajax({
        url: "/permission/edit",
        data: { params: { ...items } }
      })
      .then(res => {
        if (res) {
          this.setState({
            ispermission: false
          });
          axios.requestList(this, "/role/list", {});
          this.permForm.props.form.resetFields();
        }
      });
  };
  render() {
    const colums = [
      {
        title: "角色id",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: Utils.formateDate
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render(status) {
          return status == 1 ? "启用" : "停用";
        }
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time",
        render: Utils.formateDate
      },
      {
        title: "授权人",
        dataIndex: "authorize_user_name"
      }
    ];
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handerAddRole}>
            创建角色
          </Button>
          <Button type="primary" onClick={this.handerSetRole}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.handerSetUserRole}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            columns={colums}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            updataSelectItem={Utils.updataSelectItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({ isRoleVisible: false });
          }}
          onOk={this.handerRoleSubmit}
        >
          <RoleForm
            wrappedComponentRef={inst => {
              this.roleForm = inst;
            }}
          />
        </Modal>
        <Modal
          title="设置权限"
          width={600}
          visible={this.state.ispermission}
          onOk={this.handerPermission}
          onCancel={() => {
            this.setState({ ispermission: false });
          }}
        >
          <PermEditForm
            detailInfo={this.state.detailInfo}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
            menuInfo={this.state.menuInfo}
            wrappedComponentRef={inst => (this.permForm = inst)}
          />
        </Modal>
        <Modal
          title="用户授权"
          width={800}
          visible={this.state.isUserVisible}
          onOk={this.handerUserSubmit}
          onCancel={() => {
            this.setState({ isUserVisible: false });
          }}
        >
          <RoleAuthForm
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetData}
            mockData={this.state.mockData}
            wrappedComponentRef={inst => (this.userAuthForm = inst)}
            patchUserInfo={targetKeys => {
              this.setState({ targetData: targetKeys });
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Permission;
class RoleForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name")(
            <Input type="text" placeholder="请输入角色名" />
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("status")(
            <Select placeholder="请选择">
              <Option value={1}>启用</Option>
              <Option value={2}>停用</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}
RoleForm = Form.create()(RoleForm);

class PermEditForm extends React.Component {
  onCheck = checkedKeys => {
    console.log(checkedKeys);
    this.props.patchMenuInfo(checkedKeys);
  };
  renderTreeNode = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={item.title} key={item.key} />;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("status", { initialValue: detail_info.status })(
            <Select>
              <Option value={1}>启用</Option>
              <Option value={0}>停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={checkedKeys => {
            this.onCheck(checkedKeys);
          }}
          checkedKeys={menuInfo}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNode(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}
PermEditForm = Form.create()(PermEditForm);

class RoleAuthForm extends React.Component {
  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.props.patchUserInfo(nextTargetKeys);
    // this.setState({ targetData: nextTargetKeys });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
            dataSource={this.props.mockData}
            titles={["待选用户", "已选用户"]}
            showSearch
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            // selectedKeys={selectedKeys}
            onSelectChange={this.handleSelectChange}
            onScroll={this.handleScroll}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    );
  }
}
RoleAuthForm = Form.create()(RoleAuthForm);
