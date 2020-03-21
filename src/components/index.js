import React, { Component } from "react";
import { render } from "react-dom";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from "antd";

import ReactPlayer from "react-player";
import ProgressBar from "../components/progress";
import Control from "./Control";
import VolumeComponent from "../components/volume";
import MusicList from "../components/list";
import { createClient } from "contentful";
import "../App.css";

const { Header, Content, Footer } = Layout;
const test_music_url =
  "https://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3";

class App extends Component {
  constructor() {
    super();
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
      <Layout>
        <Header className="header-layout" style={{ width: "100%" }}>
          <img
            className="logo"
            src="https://cdn-images-1.medium.com/max/512/1*qUlxDdY3T-rDtJ4LhLGkEg.png"
          />
          <h1>React FM</h1>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 14 }}>
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
            <div></div>
          )}
          <div style={{ background: "#fff", padding: 24, minHeight: 300 }}>
            <Row type="flex" justify="space-around" align="middle" style={{}}>
              <Col span={12}>
                {playingURL.length > 0 ? (
                  <Row>
                    <h1>{playingURL[0].name}</h1>
                    <br />
                    <h2>{playingURL[0].author}</h2>
                    <br />
                  </Row>
                ) : (
                  <div></div>
                )}
                <Row>
                  <ProgressBar
                    loadingTime={this.state.loadingTime}
                    playingTime={this.state.playingTime}
                  />
                </Row>
                <br />
                <Row>
                  <Col
                    xs={{ span: 18 }}
                    sm={{ span: 12 }}
                    md={{ span: 8 }}
                    lg={{ span: 8 }}
                    xl={{ span: 6 }}
                  >
                    <Control
                      className="control-panel"
                      state={this.state.status}
                      changeStatus={this.changePlayingStatus.bind(this)}
                      leftChangeSong={this.leftChangeSong.bind(this)}
                      rightChangeSong={this.rightChangeSong.bind(this)}
                    />
                  </Col>
                </Row>
                <br />
                <br />
                <br />
                <br />
                <Row>
                  <VolumeComponent
                    addVolume={this.addVolume.bind(this)}
                    volume={this.state.volume}
                    deductVolume={this.deductVolume.bind(this)}
                  />
                </Row>
              </Col>
              <Col
                xs={{ span: 0 }}
                sm={{ span: 0 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
              >
                {playingURL.length > 0 ? (
                  <img
                    src={playingURL[0].image}
                    style={{
                      "border-radius": "50%",
                      height: "300px",
                      width: "300px"
                    }}
                  />
                ) : (
                  <div>
                    <img
                      src="https://res.cloudinary.com/alick/image/upload/v1502444310/Goodbye_hpubmk.jpg"
                      style={{
                        "border-radius": "50%",
                        height: "300px",
                        width: "300px",
                        float: "left"
                      }}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </div>
          <br />
          <div style={{ background: "#fff", padding: 24, minHeight: 300 }}>
            <MusicList
              data={this.state.musicData}
              clickChangeSong={this.clickChangeSong.bind(this)}
            />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          ©2017 Created by Zeyu Wang
        </Footer>
      </Layout>
    );
  }
}

export default App;
