import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useContext, useEffect } from "react";
import { predictCrop, predictCropManual } from "../utils/apiCalls";
import { GlobalContext } from "../GlobalState";
import markerIcon from "../assets/marker.png";

const Predict = () => {
	const { setPred, loading, setLoading } = useContext(GlobalContext);

	// Data source mode: 'api' | 'manual' | 'mock'
	const [dataMode, setDataMode] = useState("manual");
	const [apiKey, setApiKey] = useState("");
	const [error, setError] = useState("");
	const [isFading, setIsFading] = useState(false);

	// State to store the values of the inputs
	const [nitrogenInput, setnitrogenInput] = useState("");
	const [phosporusInput, setphosporusInput] = useState("");
	const [potassiumInput, setpotassiumInput] = useState("");
	const [pHInput, setpHInput] = useState("");
	const [monthInput, setmonthInput] = useState("");
	const [position, setPosition] = useState(null);

	// Manual weather inputs
	const [temperatureInput, setTemperatureInput] = useState("");
	const [humidityInput, setHumidityInput] = useState("");
	const [rainfallInput, setRainfallInput] = useState("");

	// Auto-dismiss error after 5 seconds with fade-out
	useEffect(() => {
		if (error) {
			setIsFading(false);
			const fadeTimer = setTimeout(() => {
				setIsFading(true);
			}, 4000); // Start fading at 4 seconds

			const clearTimer = setTimeout(() => {
				setError("");
				setIsFading(false);
			}, 5000); // Clear completely at 5 seconds

			return () => {
				clearTimeout(fadeTimer);
				clearTimeout(clearTimer);
			};
		}
	}, [error]);

	// Mock data values
	const mockData = {
		nitrogen: 90,
		phosphorus: 42,
		potassium: 43,
		pH: 6.5,
		temperature: 26.5,
		humidity: 75,
		rainfall: 120,
	};

	const fillMockData = () => {
		setnitrogenInput(mockData.nitrogen.toString());
		setphosporusInput(mockData.phosphorus.toString());
		setpotassiumInput(mockData.potassium.toString());
		setpHInput(mockData.pH.toString());
		setTemperatureInput(mockData.temperature.toString());
		setHumidityInput(mockData.humidity.toString());
		setRainfallInput(mockData.rainfall.toString());
	};

	// Custom hook to handle map events
	const MapEvents = () => {
		useMapEvents({
			click(e) {
				setPosition(e.latlng);
			},
		});
		return null;
	};

	const myIcon = L.icon({
		iconUrl: markerIcon,
		iconSize: [38, 48],
		iconAnchor: [19, 50],
		popupAnchor: [-3, -76],
		shadowUrl: null,
		shadowSize: null,
		shadowAnchor: null,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		// Validate soil inputs
		const soilInputs = {
			Nitrogen: nitrogenInput,
			Phosphorus: phosporusInput,
			Potassium: potassiumInput,
			pH: pHInput,
		};

		const emptyFields = Object.entries(soilInputs)
			.filter(
				([_, value]) =>
					value === "" || value === null || value === undefined,
			)
			.map(([key]) => key);

		if (emptyFields.length > 0) {
			setError(`Please fill in: ${emptyFields.join(", ")}`);
			return;
		}

		// Validate weather inputs for manual mode
		if (dataMode === "manual") {
			const weatherInputs = {
				Temperature: temperatureInput,
				Humidity: humidityInput,
				Rainfall: rainfallInput,
			};

			const emptyWeatherFields = Object.entries(weatherInputs)
				.filter(
					([_, value]) =>
						value === "" || value === null || value === undefined,
				)
				.map(([key]) => key);

			if (emptyWeatherFields.length > 0) {
				setError(`Please fill in: ${emptyWeatherFields.join(", ")}`);
				return;
			}
		}

		// Validate API key for API mode
		if (dataMode === "api" && !apiKey.trim()) {
			setError("Please enter your OpenWeatherMap API key.");
			return;
		}

		setLoading(true);

		try {
			let prediction;

			if (dataMode === "api") {
				// Use weather API with user's API key
				prediction = await predictCrop(
					nitrogenInput,
					phosporusInput,
					potassiumInput,
					pHInput,
					position,
					monthInput,
					apiKey,
				);
			} else {
				// Use manual weather inputs (works for both 'manual' and 'mock' modes)
				prediction = await predictCropManual(
					nitrogenInput,
					phosporusInput,
					potassiumInput,
					pHInput,
					temperatureInput,
					humidityInput,
					rainfallInput,
				);
			}

			setPred(prediction);
		} catch (error) {
			console.error("Prediction error:", error);

			// Extract error message from response
			let errorMessage =
				"Prediction failed. Please check your inputs and try again.";

			if (error.response?.data?.detail) {
				// Handle FastAPI validation errors (422)
				const detail = error.response.data.detail;
				if (Array.isArray(detail)) {
					// Validation error array from Pydantic
					const fields = detail
						.map((err) => err.loc?.[1] || err.msg)
						.join(", ");
					errorMessage = `Invalid input: ${fields}. Please fill all required fields.`;
				} else {
					errorMessage = detail;
				}
			} else if (error.response?.status === 422) {
				errorMessage =
					"Invalid input. Please fill all fields with valid numbers.";
			} else if (error.response?.status === 401) {
				errorMessage =
					"Invalid API key. Please check your OpenWeatherMap API key.";
			} else if (error.response?.status === 400) {
				errorMessage = "Bad request. Please provide a valid API key.";
			} else if (error.response?.status === 500) {
				errorMessage = "Server error. Please try again later.";
			} else if (error.message) {
				errorMessage = error.message;
			}

			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// Input field component for reusability
	const InputField = ({ label, id, value, onChange, placeholder, unit }) => (
		<div className="flex flex-col">
			<label
				htmlFor={id}
				className="text-sm font-light mb-1">
				{label}
			</label>
			<div className="relative">
				<input
					id={id}
					type="number"
					placeholder={placeholder}
					className="w-full text-white bg-transparent border-b border-white/30 px-1 py-2 outline-none focus:border-green text-sm transition-colors"
					value={value}
					onChange={onChange}
				/>
				{unit && (
					<span className="absolute right-1 top-1/2 -translate-y-1/2 text-white/50 text-xs">
						{unit}
					</span>
				)}
			</div>
		</div>
	);

	return (
		<div className="min-h-full text-white font-zain p-4 md:p-6 lg:p-8 overflow-y-auto">
			{loading && (
				<div className="loading-screen">
					<div className="spinner"></div>
					<p>Loading...</p>
				</div>
			)}

			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-left mb-4">
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
						Crop Prediction
					</h1>
					<p className="text-white/60 text-sm mt-1">
						Enter your soil and weather data to get crop
						recommendations
					</p>
				</div>

				{/* Data Mode Tabs */}
				<div className="flex justify-start mb-6">
					<div className="inline-flex gap-6">
						<button
							onClick={() => setDataMode("manual")}
							className={`text-sm font-medium transition-all border-b-2 pb-1 ${
								dataMode === "manual"
									? "border-green text-white"
									: "border-transparent text-white/50 hover:text-white"
							}`}>
							Manual Entry
						</button>
						<button
							onClick={() => {
								setDataMode("mock");
								fillMockData();
							}}
							className={`text-sm font-medium transition-all border-b-2 pb-1 ${
								dataMode === "mock"
									? "border-green text-white"
									: "border-transparent text-white/50 hover:text-white"
							}`}>
							Test Data
						</button>
						<button
							onClick={() => setDataMode("api")}
							className={`text-sm font-medium transition-all border-b-2 pb-1 ${
								dataMode === "api"
									? "border-green text-white"
									: "border-transparent text-white/50 hover:text-white"
							}`}>
							Weather API
						</button>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
					{/* Soil Section */}
					<div>
						<h2 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
							Soil Properties
						</h2>

						<div className="space-y-3">
							<InputField
								label="Nitrogen (N)"
								id="nitrogen"
								value={nitrogenInput}
								onChange={(e) =>
									setnitrogenInput(e.target.value)
								}
								placeholder="0"
								unit="ppm"
							/>
							<InputField
								label="Phosphorus (P)"
								id="phosphorus"
								value={phosporusInput}
								onChange={(e) =>
									setphosporusInput(e.target.value)
								}
								placeholder="0"
								unit="ppm"
							/>
							<InputField
								label="Potassium (K)"
								id="potassium"
								value={potassiumInput}
								onChange={(e) =>
									setpotassiumInput(e.target.value)
								}
								placeholder="0"
								unit="ppm"
							/>
							<InputField
								label="pH Level"
								id="pH"
								value={pHInput}
								onChange={(e) => setpHInput(e.target.value)}
								placeholder="7.0"
							/>
						</div>
					</div>

					{/* Weather Section */}
					<div className="relative">
						<h2 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
							{dataMode === "api"
								? "Location & Timeline"
								: "Weather Conditions"}
						</h2>

						{/* Error Message - Floating Box */}
						{error && (
							<div
								className={`absolute top-0 left-0 right-0 bg-black/95 border border-red-500 rounded-lg p-4 z-50 shadow-lg transition-opacity duration-1000 ${isFading ? "opacity-0" : "opacity-100"}`}>
								<div className="flex items-start gap-3">
									<div className="flex-1">
										<h3 className="text-red-500 font-bold text-base mb-1">
											Error
										</h3>
										<p className="text-white text-sm">
											{error}
										</p>
									</div>
									<button
										onClick={() => setError("")}
										className="text-white/50 hover:text-white transition-colors text-2xl leading-none">
										×
									</button>
								</div>
							</div>
						)}

						{dataMode === "api" ? (
							<div className="space-y-3">
								{/* API Key Input */}
								<div>
									<label className="text-sm font-light mb-1 block">
										OpenWeatherMap API Key
									</label>
									<input
										type="password"
										placeholder="Enter your API key"
										className="w-full text-white bg-transparent border-b border-white/30 px-1 py-2 outline-none focus:border-green text-sm transition-colors"
										value={apiKey}
										onChange={(e) =>
											setApiKey(e.target.value)
										}
									/>
								</div>

								{/* Map */}
								<div className="h-28 rounded-lg overflow-hidden">
									<MapContainer
										center={[27.7172, 85.324]}
										zoom={5}
										style={{
											height: "100%",
											width: "100%",
										}}>
										<TileLayer
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											attribution="&copy; OpenStreetMap"
										/>
										<MapEvents />
										{position && (
											<Marker
												position={position}
												icon={myIcon}
											/>
										)}
									</MapContainer>
								</div>

								{position && (
									<p className="text-xs text-white/50">
										{position.lat.toFixed(4)},{" "}
										{position.lng.toFixed(4)}
									</p>
								)}

								{/* Month Selector */}
								<div>
									<label className="text-sm font-light mb-1 block">
										Planting Month
									</label>
									<select
										value={monthInput}
										onChange={(e) =>
											setmonthInput(e.target.value)
										}
										className="w-full text-white bg-transparent border-b border-white/30 px-1 py-2 outline-none focus:border-green text-sm transition-colors">
										<option
											value=""
											className="bg-black">
											Select month
										</option>
										{[
											"Jan",
											"Feb",
											"Mar",
											"Apr",
											"May",
											"Jun",
											"Jul",
											"Aug",
											"Sep",
											"Oct",
											"Nov",
											"Dec",
										].map((month, i) => (
											<option
												key={i + 1}
												value={i + 1}
												className="bg-black">
												{month}
											</option>
										))}
									</select>
								</div>
							</div>
						) : (
							<div className="space-y-3">
								<InputField
									label="Temperature"
									id="temperature"
									value={temperatureInput}
									onChange={(e) =>
										setTemperatureInput(e.target.value)
									}
									placeholder="25"
									unit="°C"
								/>
								<InputField
									label="Humidity"
									id="humidity"
									value={humidityInput}
									onChange={(e) =>
										setHumidityInput(e.target.value)
									}
									placeholder="75"
									unit="%"
								/>
								<InputField
									label="Rainfall"
									id="rainfall"
									value={rainfallInput}
									onChange={(e) =>
										setRainfallInput(e.target.value)
									}
									placeholder="120"
									unit="mm"
								/>
							</div>
						)}
					</div>
				</div>

				{/* Submit Button */}
				<div className="mt-8 flex justify-center">
					<button
						onClick={handleSubmit}
						disabled={loading}
						className="bg-green hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed px-12 py-3 rounded-lg font-bold text-lg transition-all">
						{loading ? "Analyzing..." : "Get Prediction"}
					</button>
				</div>

				{/* Helper Text */}
				<p className="text-center text-white/40 text-xs mt-3">
					{dataMode === "api"
						? "Requires OpenWeatherMap API key (paid plan for historical data)"
						: dataMode === "mock"
							? "Using pre-filled test values - feel free to modify"
							: "Enter your own soil and weather measurements"}
				</p>
			</div>
		</div>
	);
};

export default Predict;
