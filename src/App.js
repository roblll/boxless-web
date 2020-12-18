import React, { Component } from "react";

import Player from "./components/Player";

export default class App extends Component {
  state = {
    playing: true,
    vidId: "QYh6mYIJG2Y",
  };

  render() {
    const { playing, vidId } = this.state;

    return (
      <div style={styles.container}>
        <Player vidId={vidId} playing={playing} />
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
