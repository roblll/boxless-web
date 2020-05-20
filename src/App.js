import React, { Component } from "react";

import Player from "./components/Player";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import MinControls from "./components/MinControls";
import FullControls from "./components/FullControls";

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
      today: null,
      rankMin: null,
      rankMax: null,
    },
    currentVid: {
      vidId: null,
      title: null,
      artist: null,
      thumbnail: null,
    },
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

  getVid = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/vid?dateMin=2020-04-21&dateMax=2020-04-22&rankMin=1&rankMax=100&pop=false&rap=false&latin=false&alternative=true&electronic=false&country=false&randb=false&rock&dance=false&lyrics=false&clean=false&karaoke=false`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.vidId) {
        const { vidId, title, artist } = data;
        this.setState({
          currentVid: {
            vidId,
            title,
            artist,
          },
        });
      } else {
        console.log("no data");
      }
    } catch (err) {
      console.log(err);
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
        <div style={styles.sections}>
          <Player getVid={this.getVid} vidId={vidId} />
          {activeTab !== "none" && (
            <MinControls title={title} artist={artist} />
          )}
          {activeTab === "none" && (
            <FullControls title={title} artist={artist} />
          )}
          {activeTab === "options" && (
            <Options options={options} toggle={this.handleOptionClick} />
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
