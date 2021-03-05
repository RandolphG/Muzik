import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {
  StepBackwardOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  PauseOutlined
} from "@ant-design/icons";
import "../../App.css";

export default class Control extends Component {
  /**
   * TODO
   *
   * @param {TODO} props
   */
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {};
  }

  /**
   * TODO
   * @return {!*}
   */
  render() {
    return (
      <div>
        <StepBackwardOutlined
          type="step-backward"
          style={{ fontSize: 34, paddingRight: "20px" }}
          onClick={this.props.leftChangeSong}
        />
        {this.props.state === false ? (
          <CaretRightOutlined
            type="caret-right"
            style={{ fontSize: 34, paddingRight: "20px" }}
            onClick={this.props.changeStatus}
          />
        ) : (
          <PauseOutlined
            type="pause"
            style={{ fontSize: 34, paddingRight: "20px" }}
            onClick={this.props.changeStatus}
          />
        )}
        <StepForwardOutlined
          type="step-forward"
          style={{ fontSize: 34 }}
          onClick={this.props.rightChangeSong}
        />
      </div>
    );
  }
}
