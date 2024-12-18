import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useContext } from "react";
import { predictCrop } from "../utils/apiCalls";
import { GlobalContext } from "../GlobalState";

const Predict = () => {
  const { setPred, loading, setLoading } = useContext(GlobalContext);

  // State to store the values of the inputs
  const [nitrogenInput, setnitrogenInput] = useState("");
  const [phosporusInput, setphosporusInput] = useState("");
  const [potassiumInput, setpotassiumInput] = useState("");
  const [pHInput, setpHInput] = useState("");
  const [monthInput, setmonthInput] = useState("");
  const [position, setPosition] = useState(null);

  // Custom hook to handle map events
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // Set the position of the marker when the map is clicked
        setPosition(e.latlng);
      },
    });
    return null;
  };
  const myIcon = L.icon({
    iconUrl: require("../assets/marker.png"),
    iconSize: [38, 48],
    iconAnchor: [19, 50],
    popupAnchor: [-3, -76],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  // Function to handle the submit action
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loading screen
  
    try {
      const prediction = await predictCrop(
        nitrogenInput,
        phosporusInput,
        potassiumInput,
        pHInput,
        position,
        monthInput
      );
      setPred(prediction);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false); // Hide the loading screen
    }
  };
  

  return (
    <div className="min-h-screen text-white flex font-zain">
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {/* Soil Characteristics */}
      <div className="flex align-top flex-col w-1/3 px-24 py-10">
        <p className="font-bold text-6xl">Enter Details:</p>

        <p className="font-bold text-3xl pt-3">Soil Characteristics:</p>
        <div className="flex flex-col w-full max-w-md">
          {/* Nitrogen */}
          <label
            htmlFor="nitrogen"
            className="text-lg font-light mt-2"
          >
            <p>Nitrogen Ratio:</p>
            <input
              id="nitrogen"
              type="number"
              placeholder="0.00"
              className="w-full text-white bg-grey2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-grey3"
              value={nitrogenInput}
              onChange={(e) => setnitrogenInput(e.target.value)}
            />
          </label>

          {/* Phosporus */}
          <label
            htmlFor="phosporus"
            className="text-lg font-light mt-2"
          >
            <p>Phosporus Ratio:</p>
            <input
              id="phosporus"
              type="number"
              placeholder="0.00"
              className="w-full text-white bg-grey2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-grey3"
              value={phosporusInput}
              onChange={(e) => setphosporusInput(e.target.value)}
            />
          </label>

          {/* potassium */}
          <label
            htmlFor="potassium"
            className="text-lg font-light mt-2"
          >
            <p>Potassium Ratio:</p>
            <input
              id="potassium"
              type="number"
              placeholder="0.00"
              className="w-full text-white bg-grey2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-grey3"
              value={potassiumInput}
              onChange={(e) => setpotassiumInput(e.target.value)}
            />
          </label>

          {/* pH */}
          <label
            htmlFor="pH"
            className="text-lg font-light mt-2"
          >
            <p>pH Level:</p>
            <input
              id="pH"
              type="number"
              placeholder="0.00"
              className="w-full text-white bg-grey2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-grey3"
              value={pHInput}
              onChange={(e) => setpHInput(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* geolocation */}
      <div className="flex align-top flex-col pt-28 w-1/3">
        <p className="font-bold text-3xl">Geolocation:</p>
        <p className="font-light text-xl pt-2">
          Set the marker to your farm in the map:
        </p>
        <div className="map-wrapper h-1/2">
          <MapContainer
            center={[27.7172, 85.324]} // Centered at Kathmandu
            zoom={6}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapEvents />

            {position && (
              <Marker
                position={position}
                icon={myIcon}
              ></Marker>
            )}
          </MapContainer>

          {position && (
            <div>
              <p>Marker Coordinates:</p>
              <p>Latitude: {position.lat}</p>
              <p>Longitude: {position.lng}</p>
            </div>
          )}
        </div>
      </div>

      {/* Month */}
      <div className="flex align-top flex-col w-1/4 pt-28 pl-24 py-10">
        <p className="font-bold text-3xl">Timeline:</p>
        <div className="flex flex-col w-full max-w-md">
          {/* month */}
          <label
            htmlFor="month"
            className="text-lg font-light mt-2"
          >
            <p>Select the month of your plantation: </p>
            <select
              id="month"
              onChange={(e) => setmonthInput(e.target.value)}
              className="w-full text-white align-center justify-center bg-grey2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-grey3"
            >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green items-center justify-center flex mt-48 w-52 rounded-lg"
            >
              <p className="font-bold my-3 mx-6 text-4xl">Predict</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;
