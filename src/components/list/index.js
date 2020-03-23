import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Table } from "antd";

import "../../App.css";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    width: 150
  },
  {
    title: "Author",
    dataIndex: "author",
    width: 150
  }
];

class MusicList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {};
  }

  clickHandle(record, index, event) {
    this.props.clickChangeSong(record.key);
  }

  render() {
    const dataSource = this.props.data.map((item, index) => {
      return {
        key: index + 1,
        title: item.name,
        author: item.author
      };
    });
    return (
      <div className={"title"}>
        <Table
          onRow={(record, index, event) => {
            return {
              onClick: event => {
                this.clickHandle(record, index, event);
              }
            };
          }}
          dataSource={dataSource}
          columns={columns}
          onClick={(record, index, event) => {
            this.clickHandle(record, index, event);
          }}
        />
      </div>
    );
  }
}

export default MusicList;
