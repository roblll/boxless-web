import React, { Component } from "react";

import Player from "./components/Player";

export default class App extends Component {
  state = {
    playing: true,
    vidId: "QYh6mYIJG2Y",
    muted: true,
  };

  render() {
    const { playing, vidId, muted } = this.state;

    return (
      <div style={styles.container}>
        <Player vidId={vidId} playing={playing} muted={muted} />
      </div>
    );
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
