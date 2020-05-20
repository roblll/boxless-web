import React from "react";
import { Dropdown } from "semantic-ui-react";

const RankDropdown = (props) => {
  const { min, max, value } = props;
  const rankOptions = [];

  for (let i = min; i <= max; i += 1) {
    rankOptions.push({
      key: i,
      text: i.toString(),
      value: i,
    });
  }

  return <Dropdown inline scrolling options={rankOptions} value={value} />;
};

export default RankDropdown;
