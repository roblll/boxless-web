export const getFormattedDate = ({
  options: { dayMin, dayMax, monthMin, monthMax, yearMin, yearMax },
}) => {
  return {
    dateMin: `${yearMin}-${monthMin + 1}-${dayMin}`,
    dateMax: `${yearMax}-${monthMax + 1}-${dayMax}`,
  };
};

export const getDefaultDates = () => {
  const today = new Date();
  // const decadeAgo = new Date(today.getTime() - 315400000000);
  const weekAgo = new Date(today.getTime() - 2628000000);
  const yearMax = today.getFullYear();
  const monthMax = today.getMonth();
  const dayMax = today.getDate();
  const yearMin = weekAgo.getFullYear();
  const monthMin = weekAgo.getMonth();
  const dayMin = weekAgo.getDate();
  return { yearMax, monthMax, dayMax, yearMin, monthMin, dayMin };
};

export const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
