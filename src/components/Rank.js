import React from "react";

import RankDropdown from "./RankDropdown";

const Rank = (props) => {
  const { rankMin, rankMax, handleChange } = props;
  const rankOptions = [];

  for (let i = rankMin; i <= rankMax; i += 1) {
    rankOptions.push({
      key: i,
      text: i.toString(),
      value: i,
    });
  }

  return (
    <span style={styles.rank}>
      <RankDropdown
        min={1}
        max={10}
        value={rankMin}
        rankType="rankMin"
        handleChange={handleChange}
      />
      <div style={styles.dash}>-</div>
      <RankDropdown
        min={1}
        max={10}
        value={rankMax}
        rankType="rankMax"
        handleChange={handleChange}
      />
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
