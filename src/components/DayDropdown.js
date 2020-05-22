import React from "react";
import { Dropdown } from "semantic-ui-react";

export default class DayDropdown extends React.Component {
  onChangeValue = (e, { value }) => {
    const { handleChange, dayType } = this.props;
    handleChange(dayType, value);
  };

  render() {
    const { day, days } = this.props;

    const dayOptions = [...Array(days).keys()].map((d) => {
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
        value={day}
        onChange={this.onChangeValue}
      />
    );
  }
}
