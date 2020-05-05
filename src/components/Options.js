import React from "react";

import "../App.css";
import Date from "./Date";
import Rank from "./Rank";
import OptionsButton from "./OptionsButton";

export default class Options extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.optionsRow}>
          <Date />
        </div>
        <div style={styles.optionsRow}>
          <Rank />
        </div>
        <div style={styles.optionsRow}>
          <OptionsButton toggle={() => {}} on={true} name="test" label="Test" />
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
