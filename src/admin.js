import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from './components/NavLeft'
import './style/common.less'
export default class Admin extends Component {
  render() {
    return (
      <div>
        <Row className='container'>
          <Col span="3" className='nav-left'>
              <NavLeft></NavLeft>
          </Col>
          <Col span="21" className='main'>
            <Header>头</Header>
            <Row className='content'>内容</Row>
            <Footer>尾巴</Footer>
          </Col>
        </Row>
      </div>
    );
  }
}
