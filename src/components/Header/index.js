import React, { Component } from "react";
import { Col, Row } from "antd";
import "./index.less";
import Util from "./../../utils/utils";
import axios from "../../axios";
import {connect} from 'react-redux'
class Header extends Component {
  state = {};
  componentWillMount() {
    this.setState({
      userName: "红叶"
    });
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);
    this.getWeatherAPIData();
  }
  componentDidMount(){
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);
  }
  getWeatherAPIData() {
    let city = "北京";
    axios
      .jsonp({
        url:
          "http://api.map.baidu.com/telematics/v3/weather?location=" +
          encodeURIComponent(city) +
          "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
      })
      .then(res => {
        if ((res.status = "success")) {
          let data = res.results[0].weather_data[0];
          this.setState({
            dataPicture: data.dayPictureUrl,
            weather: data.weather
          });
        }
      });
  }
  render() {
    const menuType=this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
          {
             menuType?<Col span="6" className='logo'>
            <img src='/assets/logo-ant.svg' alt=''></img>
            <span>后台管理系统</span>
           </Col>:''
          }
          <Col span={menuType?18:24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="javascript:;">退出</a>
          </Col>
        </Row>
        {
          menuType?'':<Row className="breadcrumb">
          <Col span="4" className="breadcrumb-title">
            {this.props.menuName}
          </Col>
          <Col span="20" className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-img">
              <img src={this.state.dataPicture} alt="天气" />
            </span>
            <span className="weather-detail"> {this.state.weather}</span>
          </Col>
        </Row>
        }        
      </div>
    );
  }
}
const mapState=state=>{
  return{
    menuName:state.menuName
  }
}
export default connect(mapState)(Header);
