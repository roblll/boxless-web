import { getFormattedDate } from "../utils/utils";

export const fetchVid = async (state, token) => {
  const {
    options: {
      rankMin,
      rankMax,
      alternative,
      country,
      dance,
      electronic,
      hiphop,
      house,
      latin,
      pop,
      rap,
      randb,
      rock,
      trance,
    },
    hiphopAfter,
    hiphopCount,
    houseAfter,
    houseCount,
    tranceAfter,
    tranceCount,
  } = state;
  const { dateMin, dateMax } = getFormattedDate(state);
  const api_url =
    process.env.NODE_ENV === "production"
      ? "https://boxless.herokuapp.com"
      : "http://localhost:3001";
  try {
    const response = await fetch(
      `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
      {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: token },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (err) {
    return { error: "error" };
  }
};
