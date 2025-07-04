import { showBanner, hideBannerAfterDelay } from "./banner-notification.js";
import { saveDataToStorage } from "./storage.js";

export const weatherService = (function () {
  let forecastData;

  const fetchForecastData = async (location) => {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=M32VMHE56JN7LUDHQZ6NSEGQF`
    );

    try {
      if (response.status === 200) {
        const data = await response.json();
        setForecastData(data);
        saveDataToStorage("weatherData", data);
        saveDataToStorage("weatherLocation", data.resolvedAddress);
        return;
      }

      throw new Error(response.status);
    } catch (error) {
      console.error(error);
      showBanner(error);
      hideBannerAfterDelay();
    }
  };

  const getForecastData = () => {
    return forecastData;
  };

  const setForecastData = (val) => {
    forecastData = val;
  };

  const getLocationName = () => {
    return getForecastData().resolvedAddress;
  };

  const getTodayDescription = () => {
    return getForecastData().days[0].description;
  };

  const getTodayForecast = () => {
    return getForecastData().days[0];
  };

  const getSevenDayForecast = () => {
    return getForecastData().days.slice(1, 8);
  };

  return {
    fetchForecastData,
    getForecastData,
    setForecastData,
    getLocationName,
    getTodayDescription,
    getTodayForecast,
    getSevenDayForecast,
  };
})();
