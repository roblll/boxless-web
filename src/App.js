import React, { Component } from "react";

import Login from "./components/Login";
import Player from "./components/Player";

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
    player: null,
    playlist: [],
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
    },
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }

  setPlayer = (event) => {
    this.setState({ player: event.target }, () => {
      this.getVid();
    });
  };

  getVid = async () => {
    const token = localStorage.getItem("token");
    const data = await fetchVid(this.state, token);
    if (data.vidId) {
      this.addToPlaylist(data);
    } else {
      setTimeout(() => {
        this.getVid();
      }, 4000);
    }
  };

  addToPlaylist = (vid) => {
    const { playlist } = this.state;
    this.setState({ playlist: [...playlist, vid] }, () => {
      const { player, playlist } = this.state;
      if (playlist.length === 1) {
        const { vidId } = playlist[0];
        player.loadVideoById({
          videoId: vidId,
          startSeconds: 0,
          endSeconds: 15,
        });
      }
    });
  };

  playNext = () => {
    const { player } = this.state;
    player.loadVideoById({
      videoId: "loOWKm8GW6A",
      startSeconds: 0,
      endSeconds: 15,
    });
  };

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <div>
          <Player setPlayer={this.setPlayer} playNext={this.playNext} />
        </div>
      );
    } else {
      return <Login handleLogin={this.handleLogin} />;
    }
  }
}
