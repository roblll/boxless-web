import React, { Component } from "react";

import Player from "./components/Player";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import MinControls from "./components/MinControls";
import FullControls from "./components/FullControls";
// import Static from "./components/Static";
import { getFormattedDate } from "./utils/utils";

const getDefaultDates = () => {
  const today = new Date();
  const decadeAgo = new Date(today.getTime() - 315400000000);
  const yearMax = today.getFullYear();
  const monthMax = today.getMonth();
  const dayMax = today.getDate();
  const yearMin = decadeAgo.getFullYear();
  const monthMin = decadeAgo.getMonth();
  const dayMin = decadeAgo.getDate();
  return { yearMax, monthMax, dayMax, yearMin, monthMin, dayMin };
};

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
    activeTab: "options",
    options: {
      lyrics: false,
      clean: false,
      karaoke: false,
      norepeats: true,
      alternative: false,
      country: false,
      dance: false,
      electronic: false,
      hiphop: false,
      house: false,
      latin: false,
      pop: true,
      rap: false,
      randb: false,
      rock: false,
      trance: false,
      dayMin,
      dayMax,
      monthMin,
      monthMax,
      yearMin,
      yearMax,
      rankMin: 1,
      rankMax: 10,
    },
    currentVid: {
      vidId: null,
      title: null,
      artist: null,
      thumbnail: null,
    },
    playlist: [],
    playlistPosition: 0,
  };

  handleTabClick = (e, { name }) => {
    if (this.state.activeTab === name) {
      this.setState({ activeTab: "none" });
    } else {
      this.setState({ activeTab: name }, () => {
        if (this.state.activeTab === "pick") {
          this.getPickVids();
        }
      });
    }
  };

  getPickVids = async () => {
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
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const response = await fetch(
        `http://localhost:3001/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&lyrics=false&clean=false&karaoke=false`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.vidId) {
        console.log(data);
        const { vidId, title, artist } = data;
        // this.addToPlaylist({ vidId, title, artist });
      } else {
        // console.log("no data");
        // this.getVid();
      }
    } catch (err) {
      console.log(err);
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
    } = this.state;
    const { dateMin, dateMax } = getFormattedDate(this.state);
    try {
      const response = await fetch(
        `http://localhost:3001/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&lyrics=false&clean=false&karaoke=false`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.vidId) {
        const { vidId, title, artist } = data;
        this.addToPlaylist({ vidId, title, artist });
      } else {
        // console.log("no data");
        this.getVid();
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
        this.getVid();
      }
    });
  };

  checkPlaylistQueue = () => {
    const { playlist, playlistPosition } = this.state;
    return playlistPosition === playlist.length - 1;
  };

  playNext = () => {
    let { playlist, playlistPosition } = this.state;
    if (playlist.length > playlistPosition + 1) {
      const { vidId, title, artist } = playlist[playlistPosition + 1];
      playlistPosition += 1;
      this.setState(
        {
          currentVid: { vidId, title, artist },
          playlistPosition,
        },
        () => {
          if (this.checkPlaylistQueue()) {
            this.getVid();
          }
        }
      );
    }
  };

  render() {
    const {
      activeTab,
      options,
      currentVid: { vidId, title, artist },
    } = this.state;

    return (
      <div style={styles.container}>
        {/* <Static /> */}
        <div style={styles.sections}>
          <Player getVid={this.getVid} vidId={vidId} playNext={this.playNext} />
          {activeTab !== "none" && (
            <MinControls
              title={title}
              artist={artist}
              vidId={vidId}
              playNext={this.playNext}
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
          {activeTab === "pick" && <Pick />}
          {activeTab === "search" && <Search />}
          {activeTab === "playlist" && <Playlist />}
          <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "blue",
    height: "100vh",
  },
};
