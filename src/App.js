import React, { Component } from "react";
import ReactPlayer from "react-player/youtube";

import Login from "./components/Login";
import Player from "./components/Player";
import Static from "./components/Static";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import MinControls from "./components/MinControls";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";

import { fetchSearchVids, fetchVid, fetchPickVids } from "./api/api";
import { getDefaultDates } from "./utils/utils";

const { dayMin, monthMin, yearMin, dayMax, monthMax, yearMax } =
  getDefaultDates();

export default class App extends Component {
  state = {
    loggedIn: false,
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
      lengthMax: 60,
    },
    currentVid: null,
    activeTab: "options",
    searchResults: {},
    playlist: [],
    playlistPosition: 0,
    cachedVid: null,
    playing: null,
    hiphopAfter: "",
    hiphopCount: "",
    houseAfter: "",
    houseCount: "",
    tranceAfter: "",
    tranceCount: "",
    fetchingVid: false,
    shouldPlayNext: false,
    playedNext: false,
    pickVid1: null,
    pickVid2: null,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true }, () => this.getVid());
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true }, () => {
      this.getVid();
    });
  };

  getVid = () => {
    this.setState({ fetchingVid: true }, async () => {
      const {
        options: { norepeats },
      } = this.state;
      const data = await fetchVid(this.state, localStorage.getItem("token"));
      if (data === null) {
        localStorage.clear();
        this.setState({ loggedIn: false });
      } else {
        const repeat = this.checkRepeat(data) && norepeats;
        if (
          data.vidId &&
          ReactPlayer.canPlay(
            `https://www.youtube.com/watch?v=${data.vidId}`
          ) &&
          !repeat
        ) {
          this.setState({ fetchingVid: false }, () => {
            const { playlist } = this.state;
            if (playlist.length === 0) {
              this.addToPlaylist(data);
            } else {
              this.cacheVid(data);
            }
          });
        } else {
          setTimeout(() => {
            this.getVid();
          }, 4000);
        }
      }
    });
  };

  addToPlaylist = (vid) => {
    const { playlist } = this.state;
    let updatedBeforeAndCount = {};
    if (vid.genre) {
      updatedBeforeAndCount = this.getUpdateBeforeAndCount(vid);
    }
    this.setState(
      { playlist: [...playlist, vid], ...updatedBeforeAndCount },
      () => {
        const { playlist } = this.state;
        if (playlist.length === 1) {
          this.setState({ currentVid: playlist[0] }, () => {
            this.getVid();
          });
        }
      }
    );
  };

  cacheVid = (vid) => {
    const { shouldPlayNext } = this.state;
    let updatedBeforeAndCount = {};
    if (vid.genre) {
      updatedBeforeAndCount = this.getUpdateBeforeAndCount(vid);
    }
    if (shouldPlayNext) {
      this.setState(
        { shouldPlayNext: false, cachedVid: vid, ...updatedBeforeAndCount },
        () => {
          this.playNext();
        }
      );
    } else {
      this.setState({ cachedVid: vid, ...updatedBeforeAndCount });
    }
  };

  getUpdateBeforeAndCount = (data) => {
    const {
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
    } = this.state;
    const newState = {};
    if (data.genre === "hiphop") {
      if (
        hiphopAfter === data.hiphopAfter &&
        hiphopCount === data.hiphopCount
      ) {
        newState.hiphopAfter = "";
        newState.hiphopCount = "";
      } else {
        newState.hiphopAfter = data.hiphopAfter;
        newState.hiphopCount = data.hiphopCount;
      }
    }
    if (data.genre === "house") {
      if (houseAfter === data.houseAfter && houseCount === data.houseCount) {
        newState.houseAfter = "";
        newState.houseCount = "";
      } else {
        newState.houseAfter = data.houseAfter;
        newState.houseCount = data.houseCount;
      }
    }
    if (data.genre === "trance") {
      if (
        tranceAfter === data.tranceAfter &&
        tranceCount === data.tranceCount
      ) {
        newState.tranceAfter = "";
        newState.tranceCount = "";
      } else {
        newState.tranceAfter = data.tranceAfter;
        newState.tranceCount = data.tranceCount;
      }
    }
    return newState;
  };

  playNext = async (type) => {
    const { playedNext } = this.state;
    if (type === "manual") {
      const { playlist, playlistPosition, cachedVid } = this.state;
      if (playlistPosition < playlist.length - 1) {
        const vid = playlist[playlistPosition + 1];
        this.setState({
          playlistPosition: playlistPosition + 1,
          currentVid: vid,
        });
      } else if (cachedVid) {
        const vid = cachedVid;
        this.setState(
          {
            cachedVid: null,
            playlist: [...playlist, vid],
            playlistPosition: playlistPosition + 1,
            currentVid: vid,
          },
          () => this.getVid()
        );
      }
    } else if (!playedNext) {
      const { playlist, playlistPosition, cachedVid, fetchingVid } = this.state;
      if (playlistPosition < playlist.length - 1) {
        const vid = playlist[playlistPosition + 1];
        this.setState({ playedNext: true }, () => {
          this.setState({
            playlistPosition: playlistPosition + 1,
            currentVid: vid,
            playedNext: true,
          });
        });
      } else if (cachedVid) {
        const vid = cachedVid;
        this.setState({ playedNext: true }, () => {
          this.setState(
            {
              cachedVid: null,
              playlist: [...playlist, vid],
              playlistPosition: playlistPosition + 1,
              currentVid: vid,
              playedNext: true,
            },
            () => this.getVid()
          );
        });
      } else if (fetchingVid) {
        this.setState({ shouldPlayNext: true });
      }
    } else {
      this.setState({ playedNext: false });
    }
  };

  playPrevious = () => {
    const { playlist, playlistPosition } = this.state;
    if (playlistPosition > 0) {
      const prevVid = playlist[playlistPosition - 1];
      this.setState({
        playlistPosition: playlistPosition - 1,
        currentVid: prevVid,
      });
    }
  };

  getSearchVids = async (searchTerm) => {
    const data = await fetchSearchVids(
      localStorage.getItem("token"),
      searchTerm
    );
    if (data === null) {
      localStorage.clear();
      this.setState({ loggedIn: false });
    } else {
      const { searchResults } = data;
      this.setState({ searchResults });
    }
  };

  handleError = async () => {
    const { cachedVid } = this.state;
    if (cachedVid !== null) {
      this.playNext();
    } else {
      await this.getVid();
      this.playNext();
    }
  };

  checkRepeat = (data) => {
    const { playlist } = this.state;
    let res = false;
    playlist.forEach((vid) => {
      if (data.vidId === vid.vidId) {
        res = true;
      }
    });
    return res;
  };

  handleTabClick = (e, { name }) => {
    this.setState({ activeTab: name });
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

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    this.setState({ playing: false });
  };

  togglePlayPause = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  };

  getPickVids = async () => {
    const {
      vid1Id,
      vid1Length,
      title1,
      artist1,
      vid2Id,
      vid2Length,
      title2,
      artist2,
    } = await fetchPickVids(this.state, localStorage.getItem("token"));
    this.setState({
      pickVid1: {
        vidId: vid1Id,
        vidLength: vid1Length,
        title: title1,
        artist: artist1,
      },
      pickVid2: {
        vidId: vid2Id,
        vidLength: vid2Length,
        title: title2,
        artist: artist2,
      },
    });
  };

  render() {
    const {
      loggedIn,
      currentVid,
      activeTab,
      options,
      playlist,
      playlistPosition,
      playing,
      cachedVid,
      searchResults,
      pickVid1,
      pickVid2,
    } = this.state;
    if (loggedIn) {
      return (
        <div style={styles.outerContainer}>
          <div style={styles.container}>
            {currentVid && currentVid.vidId ? (
              <Player
                vidId={currentVid.vidId}
                playNext={this.playNext}
                onPlay={this.onPlay}
                onPause={this.onPause}
                playing={playing}
                lengthMax={options.lengthMax}
                onError={this.handleError}
                endSong={this.playNext}
              />
            ) : (
              <Static width="100%" height="250px" maxWidth="450px" />
            )}
            {activeTab !== "none" && (
              <MinControls
                info={currentVid}
                playNext={this.playNext}
                playPrevious={this.playPrevious}
                cachedVid={cachedVid}
                togglePlayPause={this.togglePlayPause}
                playing={playing}
                playlistPosition={playlistPosition}
                playlist={playlist}
              />
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
                refresh={this.getPickVids}
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
              <Playlist
                playlist={playlist}
                playlistPosition={playlistPosition}
              />
            )}
            <div style={styles.bottomPadding}></div>
          </div>
          <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
        </div>
      );
    } else {
      return <Login handleLogin={this.handleLogin} />;
    }
  }
}

const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100vw",
    maxWidth: 450,
    minHeight: "100vh",
    flex: 1,
  },
  bottomPadding: {
    height: "50px",
    backgroundColor: "#3D3E3F",
  },
};
