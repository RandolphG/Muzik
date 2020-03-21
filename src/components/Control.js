import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import Icon from "antd/lib/icon";

import "../App.css";

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {};
  }

  render() {
    return (
      <div>
        <Icon
          type="step-backward"
          style={{ fontSize: 34, paddingRight: "20px" }}
          onClick={this.props.leftChangeSong}
        />
        {this.props.state === false ? (
          <Icon
            type="caret-right"
            style={{ fontSize: 34, paddingRight: "20px" }}
            onClick={this.props.changeStatus}
          />
        ) : (
          <Icon
            type="pause"
            style={{ fontSize: 34, paddingRight: "20px" }}
            onClick={this.props.changeStatus}
          />
        )}
        <Icon
          type="step-forward"
          style={{ fontSize: 34 }}
          onClick={this.props.rightChangeSong}
        />
      </div>
    );
  }
}
