import React, { Component } from "react";

export default class App extends Component {
  render() {
    return <div style={styles.container}></div>;
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
