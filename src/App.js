import React, { Component } from "react";

export default class App extends Component {
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
    return (
      <div style={styles.container}>
        <div style={styles.sections}></div>
      </div>
    );
  }
}
