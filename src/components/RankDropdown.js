import React from "react";
import { Dropdown } from "semantic-ui-react";

const RankDropdown = (props) => {
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
    <Dropdown
      inline
      scrolling
      options={rankOptions}
      defaultValue={rankOptions[0].value}
    />
  );
};

export default RankDropdown;
