import "./App.css";
import axios from "axios";

function App() {
  async function submitData(data) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  // Define the input data
  const input = {
    nitrogen: 10.0,
    phosphorus: 5.0,
    potassium: 3.0,
    temperature: 25.0,
    humidity: 80.0,
    ph: 6.5,
    rainfall: 200.0,
    location: "Should be coordinates",
    month: 7,
  };

  submitData(input);

  return (
    <div className="App">
      <header className="App-header">
        <p class="text-3xl font-bold">RopAI, Edit App.js.</p>
      </header>
    </div>
  );
}

export default App;
