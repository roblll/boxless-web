import React from "react";

import MonthDropdown from "./MonthDropdown";
import DayDropdwon from "./DayDropdown";

const Date = () => {
  return (
    <span>
      <MonthDropdown />
      <DayDropdwon days={31} />
    </span>
  );
};

export default Date;
