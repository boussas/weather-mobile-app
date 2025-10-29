import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const API_KEY = process.env.WEATHER_API_KEY;
export const getWeatherByCity = async (lat: number, lon: number) => {
  try {
    const response = await axiosInstance.get(
      `weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching weather data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export const getWeatherByCityForecast = async (lat: number, lon: number) => {
  try {
    const response = await axiosInstance.get(
      `forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching weather forecast data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export const getCityBySearch = async (city: string) => {
  try {
    const response = await axiosInstance.get(
      `find?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching city:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export default axiosInstance;
