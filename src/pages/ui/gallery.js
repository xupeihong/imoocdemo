import React, { Component } from "react";
import "./ui.less";
import { Card, Row, Col, Modal } from "antd";
const { Meta } = Card;
class IGallery extends Component {
  state = {
    visible: false
  };
  openGaller = imgsrc => {
    this.setState({
      currentImg: "/gallery/" + imgsrc,
      visible: true
    });
  };
  render() {
    const imgs = [
      ["1.png", "2.png", "3.png", "4.png", "5.png"],
      ["6.png", "7.png", "8.png", "9.png", "10.png"],
      ["11.png", "12.png", "13.png", "14.png", "15.png"],
      ["16.png", "17.png", "18.png", "19.png", "20.png"],
      ["21.png", "22.png", "23.png", "24.png", "25.png"]
    ];

    const imglist = imgs.map(list =>
      list.map(item => (
        <Card
          hoverable
          cover={<img src={"/gallery/" + item} />}
          onClick={() => {
            this.openGaller(item);
          }}
          style={{ marginBottom: "10px" }}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      ))
    );
    return (
      <div className="card-warp">
        <Row gutter={10}>
          <Col md={5}>{imglist[0]}</Col>
          <Col md={5}>{imglist[1]}</Col>
          <Col md={5}>{imglist[2]}</Col>
          <Col md={5}>{imglist[3]}</Col>
          <Col md={4}>{imglist[4]}</Col>
        </Row>
        <Modal
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: false
            });
          }}
          footer={null}
          width={400}
          height={500}
          title="图片画廊"
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
        </Modal>
      </div>
    );
  }
}

export default IGallery;
