import React from "react";

import "../App.css";
import Date from "./Date";

export default class Options extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.optionsRow}>
          <Date />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "#3D3E3F",
    color: "white",
    padding: "44px 0",
  },
  optionsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
