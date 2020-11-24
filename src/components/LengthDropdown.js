import React from "react";
import { Dropdown } from "semantic-ui-react";

export default class LengthDropdown extends React.Component {
  render() {
    const lengthOptions = [
      { key: 0, text: "Full Video", value: 0 },
      { key: 1, text: "15 sec", value: 1 },
      { key: 2, text: "30 sec", value: 2 },
      { key: 3, text: "1 min", value: 3 },
      { key: 4, text: "2 mins", value: 4 },
      { key: 5, text: "3 mins", value: 5 },
      { key: 6, text: "4 mins", value: 6 },
      { key: 7, text: "5 mins", value: 7 },
    ];

    return (
      <Dropdown
        style={{ margin: "10px" }}
        inline
        scrolling
        options={lengthOptions}
        value={0}
        onChange={this.onChangeValue}
      />
    );
  }
}
