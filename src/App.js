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
    playlistPosition: 0,
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
    cachedVid: null,
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
      const { playlist } = this.state;
      if (playlist.length === 0) {
        this.addToPlaylist(data);
      } else {
        this.cacheVid(data);
      }
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
          startSeconds: 100,
          endSeconds: 160,
        });
        this.getVid();
      }
    });
  };

  cacheVid = (vid) => {
    this.setState({ cachedVid: vid });
  };

  playNext = () => {
    const { player, playlist, playlistPosition, cachedVid } = this.state;
    let videoId = "";
    if (playlistPosition < playlist.length - 1) {
      const { vidId } = playlist[playlistPosition];
      videoId = vidId;
    } else {
      const { vidId } = cachedVid;
      videoId = vidId;
      this.getVid();
    }
    player.loadVideoById({
      videoId,
      startSeconds: 100,
      endSeconds: 160,
    });
  };

  handleError = async () => {
    const { player, cachedVid } = this.state;
    if (player.getVideoData().video_id !== cachedVid.vidId) {
      this.playNext();
    } else {
      await this.getVid();
      this.playNext();
    }
  };

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <div>
          <Player
            setPlayer={this.setPlayer}
            playNext={this.playNext}
            handleError={this.handleError}
          />
        </div>
      );
    } else {
      return <Login handleLogin={this.handleLogin} />;
    }
  }
}
