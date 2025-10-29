import { WeatherData } from "@/types/weather.types";
import moment from "moment";

export const getWeatherDataAtTime = (
  weatherData: WeatherData[],
  targetHour = 12
) => {
  return weatherData.filter(({ dt }) => {
    const date = moment.unix(dt);
    return date.hour() === targetHour;
  });
};

export { debounce } from "./helpers";
