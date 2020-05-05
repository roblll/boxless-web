import React from "react";

import MonthDropdown from "./MonthDropdown";
import DayDropdwon from "./DayDropdown";
import YearDropdown from "./YearDropdown";

const Date = () => {
  return (
    <span>
      <MonthDropdown />
      <DayDropdwon days={31} />
      <YearDropdown min={1960} max={2020} />
    </span>
  );
};

export default Date;
