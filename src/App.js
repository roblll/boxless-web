import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import ReactPlayer from "react-player/youtube";

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
    gettingVid: false,
    keepPlaying: true,
    playedNext: false,
    playlist: [],
    cachedVid: null,
    playlistPosition: 0,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  getVid = () => {
    this.setState(
      {
        gettingVid: true,
      },
      async () => {
        const data = await fetchVid(this.state, localStorage.getItem("token"));
        if (data) {
          if (
            data.vidId &&
            ReactPlayer.canPlay(`https://www.youtube.com/watch?v=${data.vidId}`)
          ) {
            this.setState({ gettingVid: false }, () => {
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
        } else {
          localStorage.clear();
          this.setState({ loggedIn: false });
        }
      }
    );
  };

  handlePlayPause = () => {
    const { currentVid, playing } = this.state;
    if (currentVid) {
      if (playing) {
        this.setState({ playing: false, keepPlaying: false });
      } else {
        this.setState({ playing: true, keepPlaying: true });
      }
    } else {
      this.setState({ playing: true }, () => {
        this.getVid();
      });
    }
  };

  playNext = () => {
    // if not at end of playlist play next vid playlist
    // else if at end of playlist and there is a cached vid, play cached vid
    // else if at end of playlist and there is no cached vid and keepPlaying is true and gettingVid is false, call getVid
    const { playedNext } = this.state;
    if (!playedNext) {
      this.setState({ playedNext: true, playing: false }, () => {
        const { playlist, playlistPosition, cachedVid } = this.state;
        if (playlistPosition < playlist.length - 1) {
        } else if (cachedVid) {
          this.setState(
            {
              cachedVid: null,
              playlist: [...playlist, cachedVid],
              playlistPosition: playlistPosition + 1,
              currentVid: cachedVid,
              playing: true,
            },
            () => this.getVid()
          );
        }
      });
    } else {
      this.setState({ playedNext: false });
    }
  };

  addToPlaylist = (vid) => {
    const { playlist } = this.state;
    this.setState({ playlist: [...playlist, vid] }, () => {
      const { playlist } = this.state;
      if (playlist.length === 1) {
        this.setState({ currentVid: playlist[0] }, () => {
          this.getVid();
        });
      }
    });
  };

  cacheVid = (vid) => {
    console.log("playing", this.state.playing);
    this.setState({ cachedVid: vid });
  };

  render() {
    const {
      loggedIn,
      playing,
      currentVid,
      options: { lengthMax },
      gettingVid,
    } = this.state;

    if (loggedIn) {
      return (
        <div style={styles.container}>
          {currentVid && currentVid.vidId ? (
            <Player
              vidId={currentVid.vidId}
              playing={playing}
              lengthMax={lengthMax}
              playNext={this.playNext}
            />
          ) : (
            <Static width="448px" height="252px" />
          )}
          {gettingVid && (
            <div>
              <p style={{ color: "white" }}>Getting Vid</p>
            </div>
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
