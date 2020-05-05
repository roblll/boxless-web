import React from "react";
import { Dropdown } from "semantic-ui-react";

const DayDropdown = (props) => {
  const dayOptions = [...Array(props.days).keys()].map((d) => {
    return {
      key: d + 1,
      text: (d + 1).toString(),
      value: d + 1,
    };
  });
  return (
    <Dropdown
      style={{ margin: "0 8px" }}
      inline
      scrolling
      options={dayOptions}
      defaultValue={dayOptions[0].value}
    />
  );
};

export default DayDropdown;
