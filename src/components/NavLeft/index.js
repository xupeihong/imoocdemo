import React, { Component } from "react";
import MenuConfig from "./../../config/menuConfig";
import { Menu } from "antd";
import "./index.less";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
class NavLeft extends Component {
  componentWillMount() {
    const menuTree = this.renderMenu(MenuConfig);
    this.setState({
      menuTree
    });
  }
  //   菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>后台管理系统</h1>
        </div>
        <Menu theme="dark">{this.state.menuTree}</Menu>
      </div>
    );
  }
}

export default NavLeft;
