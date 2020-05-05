import React from "react";
import { Dropdown } from "semantic-ui-react";

const YearDropdown = (props) => {
  const { min, max } = props;
  const yearOptions = [];

  for (let i = min; i <= max; i += 1) {
    yearOptions.push({
      key: i,
      text: i.toString(),
      value: i,
    });
  }

  return (
    <Dropdown
      inline
      scrolling
      options={yearOptions}
      defaultValue={yearOptions[0].value}
    />
  );
};

export default YearDropdown;
