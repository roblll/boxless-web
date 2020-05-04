import React, { Component } from "react";

import Player from "./components/Player";
import Tabs from "./components/Tabs";

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

    const { activeTab } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.sections}>
          <Player />
          <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
        </div>
      </div>
    );
  }
}
