import React from "react";
import { Dropdown } from "semantic-ui-react";

export default class YearDropdown extends React.Component {
  onChangeValue = (e, { value }) => {
    const { handleChange, yearType } = this.props;
    handleChange(yearType, value);
  };

  render() {
    const { year, min, max } = this.props;
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
        value={year}
        onChange={this.onChangeValue}
      />
    );
  }
}
