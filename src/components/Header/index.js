import React, { Component } from "react";
import { Col, Row } from "antd";
import './index.less'
class Header extends Component {
  componentWillMount() {
    this.setState({
      userName: "红叶"
    });
  }
  render() {
    return (
      <div className='header'>
        <Row className='header-top'>
          <Col span="24">
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span='4' className='breadcrumb-title'>
              首页
          </Col>
          <Col span='20' className='weather'>
              <span className='date'>2019-5-28</span>
              <span className='weather-detail'>多云</span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
