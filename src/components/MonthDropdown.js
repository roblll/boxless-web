import React from "react";
import { Dropdown } from "semantic-ui-react";

const monthOptions = [
  {
    key: "jan",
    text: "Jan",
    value: "jan",
  },
  {
    key: "feb",
    text: "Feb",
    value: "feb",
  },
  {
    key: "mar",
    text: "Mar",
    value: "mar",
  },
  {
    key: "apr",
    text: "Apr",
    value: "apr",
  },
  {
    key: "may",
    text: "May",
    value: "may",
  },
  {
    key: "jun",
    text: "Jun",
    value: "jun",
  },
  {
    key: "jul",
    text: "Jul",
    value: "jul",
  },
  {
    key: "aug",
    text: "Aug",
    value: "aug",
  },
  {
    key: "sep",
    text: "Sep",
    value: "sep",
  },
  {
    key: "oct",
    text: "Oct",
    value: "oct",
  },
  {
    key: "nov",
    text: "Nov",
    value: "nov",
  },
  {
    key: "dec",
    text: "Dec",
    value: "dec",
  },
];

export default class MonthDropdown extends React.Component {
  onChangeValue = (e, { value }) => {
    const { handleChange, monthType } = this.props;
    handleChange(
      monthType,
      monthOptions.findIndex((elem) => elem.value === value)
    );
  };

  render() {
    const { month } = this.props;
    return (
      <Dropdown
        inline
        scrolling
        options={monthOptions}
        value={monthOptions[month].value}
        onChange={this.onChangeValue}
      />
    );
  }
}
