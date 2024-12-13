from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins in production
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
    location: str
    month: int


@app.post("/predict")
async def predict(input: PredictionInput):
    # Placeholder logic
    return {"crops": [{"name": "Wheat", "probability": 0.85}, {"name": "Rice", "probability": 0.15}]}

