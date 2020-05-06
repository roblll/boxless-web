import React from "react";

import "../App.css";
import Date from "./Date";
import Rank from "./Rank";
import OptionsButton from "./OptionsButton";

const Options = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.optionsRow}>
        <Date />
      </div>
      <div style={styles.optionsRow}>
        <Rank />
      </div>
      <div style={styles.divider}></div>
      <div style={styles.optionsRow}>
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="lyrics"
          label="Lyrics"
        />
        <OptionsButton toggle={() => {}} on={true} name="clean" label="Clean" />
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="karaoke"
          label="Karaoke"
        />
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="norepeats"
          label="No Repeats"
        />
      </div>
      <div style={styles.divider}></div>
      <div style={styles.genreRow}>
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="alternative"
          label="Alternative"
        />
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="country"
          label="Country"
        />
        <OptionsButton toggle={() => {}} on={true} name="dance" label="Dance" />
      </div>
      <div style={styles.genreRow}>
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="electronic"
          label="Electronic"
        />
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="hiphop"
          label="Hip Hop"
        />
        <OptionsButton toggle={() => {}} on={true} name="house" label="House" />
      </div>
      <div style={styles.genreRow}>
        <OptionsButton toggle={() => {}} on={true} name="latin" label="Latin" />
        <OptionsButton toggle={() => {}} on={true} name="pop" label="Pop" />
        <OptionsButton toggle={() => {}} on={true} name="rap" label="Rap" />
      </div>
      <div style={styles.genreRow}>
        <OptionsButton toggle={() => {}} on={true} name="randb" label="R&B" />
        <OptionsButton toggle={() => {}} on={true} name="rock" label="Rock" />
        <OptionsButton
          toggle={() => {}}
          on={true}
          name="trance"
          label="Trance"
        />
      </div>
    </div>
  );
};

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
  genreRow: {
    width: "100%",
    display: "flex",
    flex: 1,
  },
  divider: {
    width: "82%",
    background: "#555",
    height: "1px",
  },
};

export default Options;
