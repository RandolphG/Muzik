import React, { Component } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Layout, Row, Col } from "antd";
import { SketchOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import ProgressBar from "./components/progress";
import Control from "./components/control";
import VolumeComponent from "./components/volume";
import MusicList from "./components/list";
import { createClient } from "contentful";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
    this.state = {
      loadingTime: 1,
      playingTime: 0,
      status: false,
      volume: 50,
      musicData: [],
      playingId: 1,
      total: 0
    };
  }

  componentDidMount() {
    const client = createClient({
      space: "nh2xhxzl53pj",
      accessToken:
        "1a0ac4dda187e8f2e365ec56c56c5bb68089b8c4ce2b71c331743bac2832d548"
    });
    client.getEntries({ content_type: "musicApi" }).then(response => {
      // const temp = [];
      let total = 0;
      const temp = response.items.map((item, index) => {
        item.fields.id = index + 1;
        total = index;
        return item.fields;
      });
      console.log(temp);
      this.setState({
        musicData: temp,
        total: total + 1
      });
    });
  }

  changePlayingStatus() {
    console.log(this.state.status);
    this.setState({
      status: !this.state.status
    });
  }

  addVolume() {
    if (this.state.volume <= 95) {
      this.setState({
        volume: this.state.volume + 5
      });
    }
  }

  deductVolume() {
    if (this.state.volume >= 5) {
      this.setState({
        volume: this.state.volume - 5
      });
    }
  }

  leftChangeSong() {
    console.log(this.state.playingId);
    console.log(this.state.total);
    if (this.state.playingId === 1) {
      this.setState({
        playingId: this.state.total,
        playingTime: 0
      });
    } else {
      this.setState({
        playingId: this.state.playingId - 1,
        playingTime: 0
      });
    }
  }

  rightChangeSong() {
    if (this.state.playingId === this.state.total) {
      this.setState({
        playingId: 1,
        playingTime: 0
      });
    } else {
      this.setState({
        playingId: this.state.playingId + 1,
        playingTime: 0
      });
    }
  }

  clickChangeSong(id) {
    this.setState({
      playingId: id,
      playingTime: 0
    });
  }

  autoPlay() {
    if (this.state.playingId === this.state.total) {
      this.setState({
        playingId: 1,
        playingTime: 0
      });
    } else {
      this.setState({
        playingId: this.state.playingId + 1,
        playingTime: 0
      });
    }
  }

  render() {
    const playingURL = this.state.musicData.filter(
      item => item.id === this.state.playingId
    );
    return (
      <div className={"player"}>
        <Header className="header-layout" style={{ width: "100%" }}>
          <p>
            <SketchOutlined style={{ marginLeft: 10, marginRight: 10 }} />
            MUZIK
          </p>
        </Header>
        {playingURL.length > 0 ? (
          <ReactPlayer
            url={playingURL[0].url}
            playing={this.state.status}
            height={0}
            onProgress={data => {
              this.setState({
                loadingTime: data.loadedSeconds,
                playingTime: data.playedSeconds
              });
            }}
            volume={this.state.volume / 100}
            onEnded={() => {
              this.autoPlay();
            }}
          />
        ) : (
          <div>NOTHING HERE</div>
        )}
        <div className={"player"}>
          {playingURL.length > 0 ? (
            <Row className={"title"}>
              <p>{playingURL[0].name}</p>
              <p>{playingURL[0].author}</p>
            </Row>
          ) : (
            <div>NOTHING HERE</div>
          )}
          <ProgressBar
            className={"title"}
            loadingTime={this.state.loadingTime}
            playingTime={this.state.playingTime}
          />
          <Control
            className="control-panel"
            state={this.state.status}
            changeStatus={this.changePlayingStatus.bind(this)}
            leftChangeSong={this.leftChangeSong.bind(this)}
            rightChangeSong={this.rightChangeSong.bind(this)}
          />
          <VolumeComponent
            addVolume={this.addVolume.bind(this)}
            volume={this.state.volume}
            deductVolume={this.deductVolume.bind(this)}
          />
          {playingURL.length > 0 ? (
            <img
              src={playingURL[0].image}
              className={"songImg"}
              alt={"song image"}
            />
          ) : (
            <img
              src="https://res.cloudinary.com/alick/image/upload/v1502444310/Goodbye_hpubmk.jpg"
              className={"songImg"}
              alt={"alt image"}
            />
          )}
        </div>
        <MusicList
          className={"title"}
          data={this.state.musicData}
          clickChangeSong={this.clickChangeSong.bind(this)}
        />
        <Footer style={{ textAlign: "center" }}>poplogics app</Footer>
      </div>
    );
  }
}

export default App;
