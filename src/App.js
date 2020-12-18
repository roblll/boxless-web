import React, { Component } from "react";

import Player from "./components/Player";

export default class App extends Component {
  state = {
    continuePlaying: true,
  };

  render() {
    return (
      <div style={styles.container}>
        <Player vidId={"QYh6mYIJG2Y"} />
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
