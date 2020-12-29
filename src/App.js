import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import Login from "./components/Login";
import Player from "./components/Player";
import Static from "./components/Static";

import { fetchVid } from "./api/api";
import { getDefaultDates } from "./utils/utils";

const {
  dayMin,
  monthMin,
  yearMin,
  dayMax,
  monthMax,
  yearMax,
} = getDefaultDates();

export default class App extends Component {
  state = {
    loggedIn: false,
    playing: false,
    options: {
      lyrics: false,
      clean: false,
      karaoke: false,
      norepeats: true,
      alternative: true,
      country: true,
      dance: true,
      electronic: true,
      hiphop: true,
      house: true,
      latin: true,
      pop: true,
      rap: true,
      randb: true,
      rock: true,
      trance: true,
      dayMin,
      dayMax,
      monthMin,
      monthMax,
      yearMin,
      yearMax,
      rankMin: 1,
      rankMax: 100,
      lengthMax: 10,
    },
    currentVid: null,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  getVid = async () => {
    const data = await fetchVid(this.state, localStorage.getItem("token"));
    this.setState({ currentVid: data });
  };

  handlePlayPause = () => {
    const { currentVid } = this.state;
    if (currentVid) {
      this.setState({ playing: !this.state.playing });
    } else {
      this.setState({ playing: true }, () => {
        this.getVid();
      });
    }
  };

  render() {
    const {
      loggedIn,
      playing,
      currentVid,
      options: { lengthMax },
    } = this.state;

    if (loggedIn) {
      return (
        <div style={styles.container}>
          {currentVid && currentVid.vidId ? (
            <Player
              vidId={currentVid.vidId}
              playing={playing}
              lengthMax={lengthMax}
            />
          ) : (
            <Static width="448px" height="252px" />
          )}
          <Button onClick={this.handlePlayPause}>Play</Button>
        </div>
      );
    } else {
      return <Login handleLogin={this.handleLogin} />;
    }
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "black",
  },
  bottomPadding: {
    height: "50px",
    backgroundColor: "#3D3E3F",
  },
};
