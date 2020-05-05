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

const MonthDropdown = () => {
  return (
    <Dropdown
      inline
      scrolling
      options={monthOptions}
      defaultValue={monthOptions[0].value}
    />
  );
};

export default MonthDropdown;
