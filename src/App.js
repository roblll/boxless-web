import React, { Component } from "react";

import Player from "./components/Player";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import MinControls from "./components/MinControls";
import FullControls from "./components/FullControls";

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
    },
    dateMin: null,
    dateMax: null,
    today: null,
    rankMin: null,
    rankMax: null,
  };

  componentDidMount() {
    const { yyyy, mm, dd } = this.getCurrentCurrentDate();

    this.setState(
      {
        dateMin: `${yyyy - 10}-${mm}-${dd}`,
        dateMax: `${yyyy}-${mm}-${dd}`,
        today: `${yyyy}-${mm}-${dd}`,
      },
      () => console.log(this.state)
    );
  }

  getCurrentCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = `${today.getMonth() + 1}`.padStart(2, 0);
    const dd = `${today.getDate()}`.padStart(2, 0);
    return { yyyy, mm, dd };
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

  render() {
    const { activeTab, options } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.sections}>
          <Player />
          {activeTab !== "none" && <MinControls />}
          {activeTab === "none" && <FullControls />}
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
