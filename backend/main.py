from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
from dotenv import load_dotenv
import os
import httpx

load_dotenv()
API_KEY = os.getenv("API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float


class LocationData(BaseModel):
    lat: float
    long: float
    month: int


with open("models/ropai_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("models/ropai_label_encoder.pkl", "rb") as le_file:
    label_encoder = pickle.load(le_file)


@app.post("/predict")
async def predict(input: PredictionInput):
    input_features = np.array(
        [
            [
                input.nitrogen,
                input.phosphorus,
                input.potassium,
                input.temperature,
                input.humidity,
                input.ph,
                input.rainfall,
            ]
        ]
    )

    probabilities = model.predict_proba(input_features)[0]

    sorted_indices = np.argsort(probabilities)[::-1]

    crops = []
    for idx in sorted_indices:
        crop_name = label_encoder.inverse_transform([idx])[0]
        crop_probability = float(probabilities[idx])
        crops.append({"name": crop_name, "probability": round(crop_probability, 4)})

    return {"crops": crops}


@app.post("/locationdata")
async def locationdata(input: LocationData):
    try:
        # using httpx for async requests
        url = (
            f"https://history.openweathermap.org/data/2.5/aggregated/month"
            f"?month={input.month}&lat={input.lat}&lon={input.long}&appid={API_KEY}"
        )
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

        if response.status_code == 200:
            data = response.json()
            temp = data["result"]["temp"]["mean"] - 273.15
            humidity = data["result"]["humidity"]["mean"]
            rainfall = data["result"]["precipitation"]["mean"] * 1000

            return {
                "temperature": temp,
                "humidity": humidity,
                "rainfall": rainfall,
            }
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Error from OpenWeatherMap: {response.text}",
            )
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {e}")
