export const getFormattedDate = ({
  options: { dayMin, dayMax, monthMin, monthMax, yearMin, yearMax },
}) => {
  return {
    dateMin: `${yearMin}-${monthMin + 1}-${dayMin}`,
    dateMax: `${yearMax}-${monthMax + 1}-${dayMax}`,
  };
};
