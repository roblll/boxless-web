import React from "react";
import { Dropdown } from "semantic-ui-react";

export default class LengthDropdown extends React.Component {
  onChangeValue = (e, { value }) => {
    const { handleChange, optionName } = this.props;
    handleChange(optionName, value);
  };

  render() {
    const { value } = this.props;
    const lengthOptions = [
      { key: 0, text: "Max", value: Infinity },
      { key: 1, text: "15 sec", value: 15 },
      { key: 2, text: "30 sec", value: 30 },
      { key: 3, text: "1 min", value: 60 },
      { key: 4, text: "2 min", value: 120 },
      { key: 5, text: "3 min", value: 180 },
      { key: 6, text: "4 min", value: 240 },
      { key: 7, text: "5 min", value: 300 },
    ];

    return (
      <Dropdown
        style={{ margin: "10px" }}
        inline
        scrolling
        options={lengthOptions}
        value={value}
        onChange={this.onChangeValue}
      />
    );
  }
}
