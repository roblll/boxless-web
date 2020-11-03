import React, { Component } from "react";

import Player from "./components/Player";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import MinControls from "./components/MinControls";
import FullControls from "./components/FullControls";
import Login from "./components/Login";
import { getFormattedDate, getDefaultDates } from "./utils/utils";

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
    activeTab: "options",
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
    currentVid: {
      vidId: null,
      vidLength: null,
      title: null,
      artist: null,
    },
    playlist: [],
    playlistPosition: 0,
    pickVid1: null,
    pickVid2: null,
    searchResults: {},
    cachedVid: null,
    cachedPickVid1: null,
    cachedPickVid2: null,
    hiphopAfter: "",
    hiphopCount: "",
    houseAfter: "",
    houseCount: "",
    tranceAfter: "",
    tranceCount: "",
    songLength: 100,
    timers: null,
    player: null,
    playing: false,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true }, () => {
        const {
          currentVid: { vidId },
        } = this.state;
        if (vidId === null) {
          this.getVid();
        }
      });
    }
  }

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

  getVid = async () => {
    const {
      options: {
        rankMin,
        rankMax,
        alternative,
        country,
        dance,
        electronic,
        hiphop,
        house,
        latin,
        pop,
        rap,
        randb,
        rock,
        trance,
      },
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
      playlist,
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.vidId) {
          const { vidId, vidLength, title, artist } = data;
          this.addToPlaylist({ vidId, vidLength, title, artist });
          this.getVidToCache();
          if (data.nextPage) {
            console.log(data.nextPage);
          }
        } else {
          // console.log("getVid() - no data");
          // // this.getVid();
          console.log("getVid() - no data");
          setTimeout(() => {
            this.getVid();
          }, 4000);
        }
      } else {
        localStorage.clear();
        this.setState({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getVidToCache = async () => {
    const {
      options: {
        rankMin,
        rankMax,
        alternative,
        country,
        dance,
        electronic,
        hiphop,
        house,
        latin,
        pop,
        rap,
        randb,
        rock,
        trance,
        norepeats,
      },
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
      playlist,
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.vidId) {
          const { vidId, vidLength, title, artist } = data;

          let repeat = false;
          playlist.forEach((vid) => {
            if (vidId === vid.vidId) {
              repeat = true;
            }
          });
          if (norepeats && repeat) {
            console.log("repeat");
            setTimeout(() => {
              this.getVidToCache();
            }, 4000);
          } else {
            const newState = { cachedVid: { vidId, vidLength, title, artist } };
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
              if (
                houseAfter === data.houseAfter &&
                houseCount === data.houseCount
              ) {
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
            this.setState({ ...newState });
          }
        } else {
          // console.log("no data");
          // this.getVidToCache();
          console.log("getVidToCache() - no data");
          setTimeout(() => {
            this.getVidToCache();
          }, 4000);
        }
      } else {
        localStorage.clear();
        this.setState({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  addToPlaylist = (vid) => {
    const { playlist } = this.state;
    if (playlist.length === 0) {
      this.setState({ playlist: [...playlist, vid] }, () => this.play());
    } else {
      this.setState({ playlist: [...playlist, vid] });
    }
  };

  play = () => {
    const { playlist, playlistPosition } = this.state;
    this.setState({ currentVid: { ...playlist[playlistPosition] } }, () => {
      if (this.checkPlaylistQueue()) {
        // this.getVid();
      }
    });
  };

  checkPlaylistQueue = () => {
    const { playlist, playlistPosition } = this.state;
    return playlistPosition === playlist.length - 1;
  };

  playNext = () => {
    let { playlist, playlistPosition, cachedVid, timers } = this.state;
    timers.forEach((timer) => {
      clearTimeout(timer);
    });
    if (playlist.length > playlistPosition + 1) {
      const { vidId, vidLength, title, artist } = playlist[
        playlistPosition + 1
      ];
      playlistPosition += 1;
      this.setState({
        currentVid: { vidId, title, artist },
        playlistPosition,
      });
    } else {
      if (cachedVid !== null) {
        this.setState(
          { currentVid: cachedVid, playlistPosition: playlistPosition + 1 },
          () => {
            this.addToPlaylist(cachedVid);
            this.getVidToCache();
          }
        );
      } else {
        this.getVid();
      }
    }
  };

  getPickVid1 = async () => {
    const {
      options: {
        rankMin,
        rankMax,
        alternative,
        country,
        dance,
        electronic,
        hiphop,
        house,
        latin,
        pop,
        rap,
        randb,
        rock,
        trance,
      },
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.vidId && data.title) {
          const { vidId, title, artist } = data;
          let newState = {};
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
            if (
              houseAfter === data.houseAfter &&
              houseCount === data.houseCount
            ) {
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
          this.setState(
            { ...newState, pickVid1: { vidId, title, artist } },
            () => this.getCachedPickVid1()
          );
        } else {
          localStorage.clear();
          this.setState({ loggedIn: false });
        }
      } else {
        // console.log("getVid() - no data");
        // // this.getVid();
        // console.log("getVid() - no data");
        console.log("getPickVid1 failed");
        setTimeout(() => {
          this.getPickVid1();
        }, 4000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  getCachedPickVid1 = async () => {
    const {
      options: {
        rankMin,
        rankMax,
        alternative,
        country,
        dance,
        electronic,
        hiphop,
        house,
        latin,
        pop,
        rap,
        randb,
        rock,
        trance,
      },
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.vidId && data.title) {
          const { vidId, title, artist } = data;
          let newState = {};
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
            if (
              houseAfter === data.houseAfter &&
              houseCount === data.houseCount
            ) {
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
          this.setState({
            ...newState,
            cachedPickVid1: { vidId, title, artist },
          });
        } else {
          // console.log("getVid() - no data");
          // // this.getVid();
          // console.log("getVid() - no data");
          console.log("getCachedPickVid1 failed");
          setTimeout(() => {
            this.getCachedPickVid1();
          }, 4000);
        }
      } else {
        localStorage.clear();
        this.setState({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getPickVid2 = async () => {
    const {
      options: {
        rankMin,
        rankMax,
        alternative,
        country,
        dance,
        electronic,
        hiphop,
        house,
        latin,
        pop,
        rap,
        randb,
        rock,
        trance,
      },
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.vidId && data.title) {
          const { vidId, title, artist } = data;
          let newState = {};
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
            if (
              houseAfter === data.houseAfter &&
              houseCount === data.houseCount
            ) {
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
          this.setState(
            { ...newState, pickVid2: { vidId, title, artist } },
            () => this.getCachedPickVid2()
          );
        } else {
          // console.log("getVid() - no data");
          // // this.getVid();
          // console.log("getVid() - no data");
          console.log("getPickVid2 failed");
          setTimeout(() => {
            this.getPickVid2();
          }, 4000);
        }
      } else {
        localStorage.clear();
        this.setState({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getCachedPickVid2 = async () => {
    const {
      options: {
        rankMin,
        rankMax,
        alternative,
        country,
        dance,
        electronic,
        hiphop,
        house,
        latin,
        pop,
        rap,
        randb,
        rock,
        trance,
      },
      hiphopAfter,
      hiphopCount,
      houseAfter,
      houseCount,
      tranceAfter,
      tranceCount,
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.vidId && data.title) {
          const { vidId, title, artist } = data;
          let newState = {};
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
            if (
              houseAfter === data.houseAfter &&
              houseCount === data.houseCount
            ) {
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
          this.setState(
            {
              ...newState,
              cachedPickVid2: { vidId, title, artist },
            },
            () => console.log(this.state.hiphopAfter, this.state.hiphopCount)
          );
        } else {
          // console.log("getVid() - no data");
          // // this.getVid();
          // console.log("getVid() - no data");
          console.log("getCachedPickVid2 failed");
          setTimeout(() => {
            this.getCachedPickVid2();
          }, 4000);
        }
      } else {
        localStorage.clear();
        this.setState({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  refreshPickVids = () => {
    const { cachedPickVid1, cachedPickVid2 } = this.state;
    if (cachedPickVid1 && cachedPickVid2) {
      this.setState(
        {
          pickVid1: { ...cachedPickVid1 },
          pickVid2: { ...cachedPickVid2 },
          cachedPickVid1: null,
          cachedPickVid2: null,
        },
        () => {
          this.getCachedPickVid1();
          this.getCachedPickVid2();
        }
      );
    } else {
      this.setState(
        {
          pickVid1: null,
          pickVid2: null,
        },
        () => {
          this.getPickVid1();
          this.getPickVid2();
        }
      );
    }
  };

  getSearchVids = async (searchTerm) => {
    try {
      const token = localStorage.getItem("token");
      const api_url =
        process.env.NODE_ENV === "production"
          ? "https://boxless.herokuapp.com"
          : "http://localhost:3001";
      const response = await fetch(
        `${api_url}/api/searchvids?search=${searchTerm.replace(/ /g, "%")}`,
        {
          method: "GET",
          headers: { "content-type": "application/json", Authorization: token },
        }
      );
      if (response.ok) {
        const { searchResults } = await response.json();
        this.setState({ searchResults });
      } else {
        localStorage.clear();
        this.setState({ loggedIn: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleLogin = () => {
    this.setState({ loggedIn: true }, () => {
      if (localStorage.getItem("token")) {
        this.setState({ loggedIn: true }, () => {
          const {
            currentVid: { vidId },
          } = this.state;
          if (vidId === null) {
            this.getVid();
          }
        });
      }
    });
  };

  getTimers = (timers) => {
    this.setState({ timers });
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

  setPlayer = (event) => {
    this.setState({ player: event.target });
  };

  onPlay = () => {
    this.setState({ playing: true });
  };

  onPause = () => {
    this.setState({ playing: false });
  };

  render() {
    const {
      activeTab,
      currentVid: { vidId, vidLength, title, artist },
      options,
      pickVid1,
      pickVid2,
      searchResults,
      playlist,
      playlistPosition,
      loggedIn,
      songLength,
      cachedVid,
      playing,
    } = this.state;

    if (loggedIn) {
      return (
        <div style={styles.container}>
          <Player
            getVid={this.getVid}
            vidId={vidId}
            vidLength={vidLength}
            playNext={this.playNext}
            songLength={songLength}
            getTimers={this.getTimers}
            setPlayer={this.setPlayer}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />
          {activeTab !== "none" && (
            <MinControls
              title={title}
              artist={artist}
              vidId={vidId}
              playNext={this.playNext}
              cachedVid={cachedVid}
              togglePlayPause={this.togglePlayPause}
              playing={playing}
            />
          )}
          {activeTab === "none" && (
            <FullControls title={title} artist={artist} vidId={vidId} />
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
          <div style={styles.bottomPadding}></div>
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
