import React, { Component } from "react";
import { render } from "react-dom";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Progress } from "antd";

import "../../App.css";

class ProgressBar extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      percentage: 0
    };
  }

  componentWillReceiveProps() {
    const loadingTime = this.props.loadingTime;
    const playingTime = this.props.playingTime;

    const percentage = Math.floor((playingTime * 100) / (loadingTime + 1));
    this.setState({
      percentage: percentage
    });
  }

  render() {
    return (
      <div>
        <Progress
          percent={this.state.percentage}
          showInfo={false}
          strokeWidth={2}
        />
      </div>
    );
  }
}

export default ProgressBar;
