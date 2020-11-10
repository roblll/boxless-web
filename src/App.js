import React, { Component } from "react";

import Player from "./components/Player";

export default class App extends Component {
  state = {
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
  };

  setPlayer = (event) => {
    this.setState({ player: event.target }, () => {
      this.play();
    });
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

  render() {
    return (
      <div>
        <Player setPlayer={this.setPlayer} playNext={this.playNext} />
      </div>
    );
  }
}
