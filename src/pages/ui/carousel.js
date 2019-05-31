import React, { Component } from "react";
import "./ui.less";
import { Card, Carousel } from "antd";
class ICarousel extends Component {
    onChange=()=>{

    }
  render() {
    return (
      <div>
        <Card title="文字背景轮播" className='card-warp'>
          <Carousel afterChange={this.onChange} autoplay effect='fade'>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
          ,
        </Card>
        <Card title="图片轮播" className='slider-wrap'>
          <Carousel afterChange={this.onChange} autoplay effect='fade' >
            <div>
              <img src='/carousel-img/carousel-1.jpg'></img>
            </div>
            <div>
            <img src='/carousel-img/carousel-2.jpg'></img>
            </div>
            <div>
            <img src='/carousel-img/carousel-3.jpg'></img>
            </div>            
          </Carousel>
          ,
        </Card>
      </div>
    );
  }
}

export default ICarousel;
