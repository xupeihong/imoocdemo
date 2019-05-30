import React, { Component } from "react";
import "./../style/common.less";
class Nomatch extends Component {
  render() {
    return (
      <div className="nofound">
        <span>未找到该页面</span>
      </div>
    );
  }
}

export default Nomatch;
