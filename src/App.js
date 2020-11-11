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
    playlist: [
      {
        vidId: "QYh6mYIJG2Y",
        vidLength: 184,
        title: "7 Rings",
        artist: "Ariana Grande",
      },
      {
        vidId: "loOWKm8GW6A",
        vidLength: 232,
        title: "Level of Concern",
        artist: "Twenty One Pilots",
      },
    ],
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
  };

  play = () => {
    const { player } = this.state;
    if (player) {
      player.loadVideoById({
        videoId: "QYh6mYIJG2Y",
        startSeconds: 0,
        endSeconds: 15,
      });
    }
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
