import React, { Component } from "react";

import Player from "./components/Player";
import Tabs from "./components/Tabs";
import Options from "./components/Options";
import Pick from "./components/Pick";
import Search from "./components/Search";
import Playlist from "./components/Playlist";

export default class App extends Component {
  state = {
    activeTab: "options",
  };

  handleTabClick = (e, { name }) => {
    if (this.state.activeTab === name) {
      this.setState({ activeTab: "none " });
    } else {
      this.setState({ activeTab: name });
    }
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.sections}>
          <Player />
          {activeTab === "options" && <Options />}
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
