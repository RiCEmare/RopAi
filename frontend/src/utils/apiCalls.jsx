import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getWeatherdata = async (position, month, apiKey = null) => {
	console.log("Position:", position.lng);
	console.log("Month:", month);
	const data = {
		lat: position.lat,
		long: position.lng,
		month: parseInt(month),
		api_key: apiKey,
	};
	try {
		const response = await axios.post(`${BASE_URL}/locationdata`, data);
		return response.data;
	} catch (error) {
		console.error("Error from weather:", error);
		throw error;
	}
};

// Predict using weather API (requires API key)
export const predictCrop = async (
	nitrogenInput,
	phosphorusInput,
	potassiumInput,
	pHInput,
	position,
	month,
	apiKey = null,
) => {
	const weatherData = await getWeatherdata(position, month, apiKey);

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

// Predict using manual weather inputs (no API key needed)
export const predictCropManual = async (
	nitrogenInput,
	phosphorusInput,
	potassiumInput,
	pHInput,
	temperature,
	humidity,
	rainfall,
) => {
	const predictdata = {
		nitrogen: parseFloat(nitrogenInput),
		phosphorus: parseFloat(phosphorusInput),
		potassium: parseFloat(potassiumInput),
		temperature: parseFloat(temperature),
		humidity: parseFloat(humidity),
		ph: parseFloat(pHInput),
		rainfall: parseFloat(rainfall),
	};
	try {
		const response = await axios.post(`${BASE_URL}/predict`, predictdata);
		return response.data;
	} catch (error) {
		console.error("Error from predict:", error);
		throw error;
	}
};

// Get mock weather data for testing
export const getMockWeather = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/mockweather`);
		return response.data;
	} catch (error) {
		console.error("Error fetching mock weather:", error);
		throw error;
	}
};
