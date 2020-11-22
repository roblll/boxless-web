import React, { Component } from "react";

import Login from "./components/Login";
import Player from "./components/Player";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import MinControls from "./components/MinControls";
import FullControls from "./components/FullControls";

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
    loadingCachedVid: false,
    activeTab: "options",
    pickVid1: null,
    pickVid2: null,
    searchResults: {},
    playing: false,
    playedNext: false,
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
    if (data === null) {
      localStorage.clear();
      this.setState({ loggedIn: false });
    } else {
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
          endSeconds: 123,
        });
        this.getVid();
      }
    });
  };

  cacheVid = (vid) => {
    this.setState({ cachedVid: vid, loadingCachedVid: false });
  };

  playNext = async () => {
    const {
      playlist,
      playlistPosition,
      cachedVid,
      loadingCachedVid,
      playedNext,
    } = this.state;
    if (playlistPosition < playlist.length - 1) {
      if (playedNext) {
        this.setState({ playedNext: false });
      } else {
        const { vidId } = playlist[playlistPosition];
        this.loadVideo(vidId);
        this.setState({
          playlistPosition: playlistPosition + 1,
          playedNext: true,
        });
      }
    } else if (cachedVid) {
      const { vidId } = cachedVid;
      this.loadVideo(vidId);
      this.useCachedVid();
    } else if (cachedVid === null && !loadingCachedVid) {
      await this.getVid();
      this.playNext();
    }
  };

  loadVideo = (videoId) => {
    const { player } = this.state;
    player.loadVideoById({
      videoId,
      startSeconds: 100,
      endSeconds: 123,
    });
  };

  useCachedVid = () => {
    const { playlist, playlistPosition, cachedVid } = this.state;
    if (playlist[playlistPosition].vidId !== cachedVid.vidId) {
      this.setState({
        playlistPosition: playlistPosition + 1,
        playlist: [...playlist, cachedVid],
        cachedVid: null,
        loadingCachedVid: true,
      });
      this.getVid();
    }
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

  handleTabClick = (e, { name }) => {
    if (this.state.activeTab === name) {
      this.setState({ activeTab: "none" });
    } else {
      this.setState({ activeTab: name });
    }
  };

  handleOptionClick = (e) => {
    const option = e.target.name;
    this.setState({
      options: {
        ...this.state.options,
        [option]: !this.state.options[option],
      },
    });
  };

  handleDropDownChange = (dropDownType, value) => {
    this.setState({
      options: { ...this.state.options, [dropDownType]: value },
    });
  };

  refreshPickVids = () => {
    console.log("refreshPickVids");
  };

  getSearchVids = async (searchTerm) => {
    console.log("getSearchVids");
  };

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    this.setState({ playing: false });
  };

  togglePlayPause = () => {
    const { player, playing } = this.state;
    if (player) {
      if (playing) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  playPrevious = () => {
    const { playlist, playlistPosition } = this.state;
    if (playlistPosition > 0) {
      const prevVid = playlist[playlistPosition - 1];
      const { vidId } = prevVid;
      this.loadVideo(vidId);
      this.setState({ playlistPosition: playlistPosition - 1 });
    }
  };

  render() {
    const {
      loggedIn,
      activeTab,
      options,
      pickVid1,
      pickVid2,
      searchResults,
      playlist,
      playlistPosition,
      cachedVid,
      playing,
    } = this.state;
    if (loggedIn) {
      return (
        <div style={styles.container}>
          <Player
            setPlayer={this.setPlayer}
            playNext={this.playNext}
            handleError={this.handleError}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />
          {activeTab !== "none" && (
            <MinControls
              info={playlist[playlistPosition]}
              playNext={this.playNext}
              playPrevious={this.playPrevious}
              cachedVid={cachedVid}
              togglePlayPause={this.togglePlayPause}
              playing={playing}
              playlistPosition={playlistPosition}
            />
          )}
          {activeTab === "none" && (
            <FullControls info={playlist[playlistPosition]} />
          )}
          {activeTab === "options" && (
            <Options
              options={options}
              toggle={this.handleOptionClick}
              handleChange={this.handleDropDownChange}
            />
          )}
          {activeTab === "pick" && (
            <Pick
              pickVid1={pickVid1}
              pickVid2={pickVid2}
              refresh={this.refreshPickVids}
              addToPlaylist={this.addToPlaylist}
            />
          )}
          {activeTab === "search" && (
            <Search
              getSearchVids={this.getSearchVids}
              searchResults={searchResults}
              addToPlaylist={this.addToPlaylist}
            />
          )}
          {activeTab === "playlist" && (
            <Playlist playlist={playlist} playlistPosition={playlistPosition} />
          )}
          <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
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
