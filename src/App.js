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

import { fetchSearchVids, fetchVid } from "./api/api";
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
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true }, () => this.getVid());
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  getVid = async () => {
    const data = await fetchVid(this.state, localStorage.getItem("token"));
    if (data === null) {
      localStorage.clear();
      this.setState({ loggedIn: false });
    } else {
      if (
        data.vidId &&
        ReactPlayer.canPlay(`https://www.youtube.com/watch?v=${data.vidId}`)
      ) {
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
    let updatedBeforeAndCount = {};
    if (vid.genre) {
      updatedBeforeAndCount = this.getUpdateBeforeAndCount(vid);
    }
    this.setState({ cachedVid: vid, ...updatedBeforeAndCount });
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

  playNext = () => {
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
        () => {
          this.getVid();
        }
      );
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

  render() {
    console.log(
      "before and count",
      this.state.hiphopCount,
      this.state.hiphopAfter
    );
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
    } = this.state;
    if (loggedIn) {
      return (
        <div style={styles.container}>
          {currentVid && currentVid.vidId ? (
            <Player
              vidId={currentVid.vidId}
              playNext={this.playNext}
              onPlay={this.onPlay}
              onPause={this.onPause}
              playing={playing}
              lengthMax={options.lengthMax}
            />
          ) : (
            <Static width="448px" height="252px" />
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
              // pickVid1={pickVid1}
              // pickVid2={pickVid2}
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

// import React, { Component } from "react";

// import Login from "./components/Login";
// import Player from "./components/Player";
// import Tabs from "./components/Tabs";
// import Options from "./components/Options";
// import Pick from "./components/Pick";
// import Search from "./components/Search";
// import Playlist from "./components/Playlist";
// import MinControls from "./components/MinControls";
// import FullControls from "./components/FullControls";

// import { fetchVid, fetchSearchVids, fetchPickVids } from "./api/api";
// import { getDefaultDates } from "./utils/utils";

// const {
//   dayMin,
//   monthMin,
//   yearMin,
//   dayMax,
//   monthMax,
//   yearMax,
// } = getDefaultDates();

// export default class App extends Component {
//   state = {
//     loggedIn: false,
//     player: null,
//     playlist: [],
//     playlistPosition: 0,
//     options: {
//       lyrics: false,
//       clean: false,
//       karaoke: false,
//       norepeats: true,
//       alternative: true,
//       country: true,
//       dance: true,
//       electronic: true,
//       hiphop: true,
//       house: true,
//       latin: true,
//       pop: true,
//       rap: true,
//       randb: true,
//       rock: true,
//       trance: true,
//       dayMin,
//       dayMax,
//       monthMin,
//       monthMax,
//       yearMin,
//       yearMax,
//       rankMin: 1,
//       rankMax: 100,
//       lengthMax: 60,
//     },
//     cachedVid: null,
//     loadingCachedVid: false,
//     activeTab: "options",
//     pickVid1: null,
//     pickVid2: null,
//     searchResults: {},
//     playing: false,
//     playedNext: false,
//   };

//   componentDidMount() {
//     if (localStorage.getItem("token")) {
//       this.setState({ loggedIn: true });
//     }
//   }

//   setPlayer = (event) => {
//     this.setState({ player: event.target }, () => {
//       this.getVid();
//     });
//   };

//   getVid = async () => {
//     const token = localStorage.getItem("token");
//     const data = await fetchVid(this.state, token);
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       if (data.vidId) {
//         const { playlist } = this.state;
//         if (playlist.length === 0) {
//           this.addToPlaylist(data);
//         } else {
//           this.cacheVid(data);
//         }
//       } else {
//         setTimeout(() => {
//           this.getVid();
//         }, 4000);
//       }
//     }
//   };

//   addToPlaylist = (vid) => {
//     const { playlist } = this.state;
//     this.setState({ playlist: [...playlist, vid] }, () => {
//       const { playlist } = this.state;
//       if (playlist.length === 1) {
//         const { vidId } = playlist[0];
//         this.loadVideo(vidId);
//         this.getVid();
//       }
//     });
//   };

//   cacheVid = (vid) => {
//     this.setState({ cachedVid: vid, loadingCachedVid: false });
//   };

//   playNext = async (type) => {
//     const {
//       playlist,
//       playlistPosition,
//       playedNext,
//       cachedVid,
//       loadingCachedVid,
//     } = this.state;
//     if (playedNext) {
//       this.setState({ playedNext: false });
//     } else {
//       if (playlistPosition < playlist.length - 1) {
//         const { vidId } = playlist[playlistPosition + 1];
//         if (type === "automatic") {
//           this.setState(
//             {
//               playlistPosition: playlistPosition + 1,
//               playedNext: true,
//             },
//             () => this.loadVideo(vidId)
//           );
//         } else {
//           this.setState(
//             {
//               playlistPosition: playlistPosition + 1,
//             },
//             () => this.loadVideo(vidId)
//           );
//         }
//       } else if (cachedVid) {
//         const { vidId } = cachedVid;
//         this.loadVideo(vidId);
//         this.useCachedVid();
//       } else if (cachedVid === null && !loadingCachedVid) {
//         await this.getVid();
//         this.playNext("manual");
//       }
//     }
//   };

//   loadVideo = (videoId) => {
//     const {
//       player,
//       options: { lengthMax },
//     } = this.state;
//     let start = 0;
//     // let end = start + lengthMax;
//     let end = lengthMax;
//     player.loadVideoById({
//       videoId,
//       startSeconds: start,
//       endSeconds: end,
//     });
//   };

//   useCachedVid = () => {
//     const { playlist, playlistPosition, cachedVid } = this.state;
//     if (playlist[playlistPosition].vidId !== cachedVid.vidId) {
//       this.setState({
//         playlistPosition: playlistPosition + 1,
//         playlist: [...playlist, cachedVid],
//         cachedVid: null,
//         loadingCachedVid: true,
//       });
//       this.getVid();
//     }
//   };

//   handleError = async () => {
//     console.log("handleError");
//     const { player, cachedVid } = this.state;
//     if (
//       cachedVid !== null &&
//       player.getVideoData().video_id !== cachedVid.vidId
//     ) {
//       this.playNext("manual");
//     } else {
//       await this.getVid();
//       this.playNext("manual");
//     }
//   };

//   handleLogin = () => {
//     this.setState({ loggedIn: true });
//   };

//   handleTabClick = (e, { name }) => {
//     if (this.state.activeTab === name) {
//       this.setState({ activeTab: "none" });
//     } else {
//       this.setState({ activeTab: name });
//     }
//   };

//   handleOptionClick = (e) => {
//     const option = e.target.name;
//     this.setState({
//       options: {
//         ...this.state.options,
//         [option]: !this.state.options[option],
//       },
//     });
//   };

//   handleDropDownChange = (dropDownType, value) => {
//     this.setState({
//       options: { ...this.state.options, [dropDownType]: value },
//     });
//   };

//   getPickVids = async () => {
//     const token = localStorage.getItem("token");
//     const data = await fetchPickVids(this.state, token);
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       console.log(data);
//     }
//   };

//   getSearchVids = async (searchTerm) => {
//     const token = localStorage.getItem("token");
//     const data = await fetchSearchVids(token, searchTerm);
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       const { searchResults } = data;
//       this.setState({ searchResults });
//     }
//   };

//   onPlay = () => {
//     this.setState({ playing: true });
//   };

//   onPause = () => {
//     this.setState({ playing: false });
//   };

//   togglePlayPause = () => {
//     const { player, playing } = this.state;
//     if (player) {
//       if (playing) {
//         player.pauseVideo();
//       } else {
//         player.playVideo();
//       }
//     }
//   };

//   playPrevious = () => {
//     const { playlist, playlistPosition } = this.state;
//     if (playlistPosition > 0) {
//       const prevVid = playlist[playlistPosition - 1];
//       const { vidId } = prevVid;
//       this.setState({ playlistPosition: playlistPosition - 1 }, () =>
//         this.loadVideo(vidId)
//       );
//     }
//   };

//   render() {
//     const {
//       loggedIn,
//       activeTab,
//       options,
//       pickVid1,
//       pickVid2,
//       searchResults,
//       playlist,
//       playlistPosition,
//       cachedVid,
//       playing,
//       player,
//     } = this.state;
//     if (loggedIn) {
//       return (
//         <div style={styles.container}>
//           <Player
//             setPlayer={this.setPlayer}
//             playNext={this.playNext}
//             handleError={this.handleError}
//             onPlay={this.onPlay}
//             onPause={this.onPause}
//           />
//           {activeTab !== "none" && (
//             <MinControls
//               info={playlist[playlistPosition]}
//               playNext={this.playNext}
//               playPrevious={this.playPrevious}
//               cachedVid={cachedVid}
//               togglePlayPause={this.togglePlayPause}
//               playing={playing}
//               playlistPosition={playlistPosition}
//               playlist={playlist}
//               player={player}
//             />
//           )}
//           {activeTab === "none" && (
//             <FullControls info={playlist[playlistPosition]} />
//           )}
//           {activeTab === "options" && (
//             <Options
//               options={options}
//               toggle={this.handleOptionClick}
//               handleChange={this.handleDropDownChange}
//             />
//           )}
//           {activeTab === "pick" && (
//             <Pick
//               pickVid1={pickVid1}
//               pickVid2={pickVid2}
//               refresh={this.getPickVids}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "search" && (
//             <Search
//               getSearchVids={this.getSearchVids}
//               searchResults={searchResults}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "playlist" && (
//             <Playlist playlist={playlist} playlistPosition={playlistPosition} />
//           )}
//           <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
//         </div>
//       );
//     } else {
//       return <Login handleLogin={this.handleLogin} />;
//     }
//   }
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     backgroundColor: "black",
//   },
//   bottomPadding: {
//     height: "50px",
//     backgroundColor: "#3D3E3F",
//   },
// };
