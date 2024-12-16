import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getWeatherdata = async (position, month) => {
  console.log("Position:", position.lng);
  console.log("Month:", month);
  const data = {
    lat: position.lat,
    long: position.lng,
    month: parseInt(month),
  };
  try {
    const response = await axios.post(`${BASE_URL}/locationdata`, data);
    return response.data;
  } catch (error) {
    console.error("Error from weather:", error);
    throw error;
  }
};

export const predictCrop = async (
  nitrogenInput,
  phosphorusInput,
  potassiumInput,
  pHInput,
  position,
  month
) => {
  const weatherData = await getWeatherdata(position, month);

  const predictdata = {
    nitrogen: parseFloat(nitrogenInput),
    phosphorus: parseFloat(phosphorusInput),
    potassium: parseFloat(potassiumInput),
    temperature: parseFloat(weatherData.temperature),
    humidity: parseFloat(weatherData.humidity),
    ph: parseFloat(pHInput),
    rainfall: parseFloat(weatherData.rainfall),
  };
  try {
    const response = await axios.post(`${BASE_URL}/predict`, predictdata);
    return response.data;
  } catch (error) {
    console.error("Error from predict:", error);
    throw error;
  }
};
