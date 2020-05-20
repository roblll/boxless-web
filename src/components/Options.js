import React from "react";

import "../App.css";
import DateRange from "./DateRange";
import Rank from "./Rank";
import OptionsButton from "./OptionsButton";

const Options = (props) => {
  const {
    options: {
      lyrics,
      clean,
      karaoke,
      norepeats,
      alternative,
      country,
      dance,
      electronic,
      hiphop,
      house,
      latin,
      pop,
      rap,
      randb,
      rock,
      trance,
      dateMin,
      dateMax,
    },
    toggle,
  } = props;

  return (
    <div style={styles.container}>
      <div style={styles.optionsRow}>
        <DateRange dateMin={dateMin} dateMax={dateMax} />
      </div>
      <div style={styles.optionsRow}>
        <Rank />
      </div>
      <div style={styles.divider}></div>
      <div style={styles.optionsRow}>
        <OptionsButton
          toggle={toggle}
          on={lyrics}
          name="lyrics"
          label="Lyrics"
        />
        <OptionsButton toggle={toggle} on={clean} name="clean" label="Clean" />
        <OptionsButton
          toggle={toggle}
          on={karaoke}
          name="karaoke"
          label="Karaoke"
        />
        <OptionsButton
          toggle={toggle}
          on={norepeats}
          name="norepeats"
          label="No Repeats"
        />
      </div>
      <div style={styles.divider}></div>
      <div style={styles.genreRow}>
        <OptionsButton
          toggle={toggle}
          on={alternative}
          name="alternative"
          label="Alternative"
        />
        <OptionsButton
          toggle={toggle}
          on={country}
          name="country"
          label="Country"
        />
        <OptionsButton toggle={toggle} on={dance} name="dance" label="Dance" />
      </div>
      <div style={styles.genreRow}>
        <OptionsButton
          toggle={toggle}
          on={electronic}
          name="electronic"
          label="Electronic"
        />
        <OptionsButton
          toggle={toggle}
          on={hiphop}
          name="hiphop"
          label="Hip Hop"
        />
        <OptionsButton toggle={toggle} on={house} name="house" label="House" />
      </div>
      <div style={styles.genreRow}>
        <OptionsButton toggle={toggle} on={latin} name="latin" label="Latin" />
        <OptionsButton toggle={toggle} on={pop} name="pop" label="Pop" />
        <OptionsButton toggle={toggle} on={rap} name="rap" label="Rap" />
      </div>
      <div style={styles.genreRow}>
        <OptionsButton toggle={toggle} on={randb} name="randb" label="R&B" />
        <OptionsButton toggle={toggle} on={rock} name="rock" label="Rock" />
        <OptionsButton
          toggle={toggle}
          on={trance}
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
