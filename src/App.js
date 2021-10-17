import React, { Component } from "react";

import Player from "./components/Player";

export default class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Player vidId={"d-JBBNg8YKs"} />
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
};
