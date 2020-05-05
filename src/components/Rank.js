import React from "react";

import RankDropdown from "./RankDropdown";

const Rank = (props) => {
  const { min, max } = props;
  const rankOptions = [];

  for (let i = min; i <= max; i += 1) {
    rankOptions.push({
      key: i,
      text: i.toString(),
      value: i,
    });
  }

  return (
    <span style={styles.rank}>
      <RankDropdown min={1} max={10} />
      <div style={styles.dash}>-</div>
      <RankDropdown min={1} max={10} />
    </span>
  );
};

const styles = {
  dash: {
    display: "inline",
    margin: "0 8px",
  },
  rank: {
    margin: "10px",
  },
};

export default Rank;
