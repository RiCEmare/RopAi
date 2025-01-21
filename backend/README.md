## Running locally
Rename `.env.example` to `.env` and edit its **API_KEY**
```sh
pip install -r requirements.txt

```
```sh
uvicorn main:app --reload

```
#### This hosts the backend at `localhost:8000`.

# Endpoints
- ### /predict
  - Request Example:
  `
  {
    "nitrogen": float,
    "phosphorus": float,
    "potassium": float,
    "temperature": float,
    "humidity": float,
    "ph": float,
    "rainfall": float
  }
  `
  - Response Example:
  `
  {
  "crops": [
    {
      "name": "kidneybeans",
      "probability": 0.6524,
      "info": {
        "fact": "Kidneybeans are named for their shape, which resembles a human kidney.",
        "common_diseases": [
          "Anthracnose",
          "Rust disease",
          "Bacterial blight"
        ],
        "plantation_time": "June–July (monsoon crop)",
        "planted_before": "Before 90–120 days"
      }
    },
    {
      "name": "muskmelon",
      "probability": 0.1482,
      "info": {
        "fact": "Muskmelons are packed with vitamins A and C, making them great for skin health.",
        "common_diseases": [
          "Powdery mildew",
          "Downy mildew",
          "Fusarium wilt"
        ],
        "plantation_time": "February–April",
        "planted_before": "Before 80–100 days"
      }
    },
    {
      "name": "orange",
      "probability": 0.1436,
      "info": {
        "fact": "Oranges are a hybrid of pomelo and mandarin and are one of the most popular fruits worldwide.",
        "common_diseases": [
          "Citrus canker",
          "Greening disease",
          "Anthracnose"
        ],
        "plantation_time": "June–July (nursery planting)",
        "planted_before": "Before 5–8 years (fruiting starts)"
      }
    },
    {
      "name": "mothbeans",
      "probability": 0.048,
      "info": {
        "fact": "Mothbeans are drought-resistant and thrive in arid and semi-arid regions.",
        "common_diseases": [
          "Cercospora leaf spot",
          "Yellow mosaic virus",
          "Anthracnose"
        ],
        "plantation_time": "June–July",
        "planted_before": "Before 70–90 days"
      }
    },
    {
      "name": "mango",
      "probability": 0.0037,
      "info": {
        "fact": "Mangoes are known as the 'king of fruits' and have been cultivated in South Asia for over 4,000 years.",
        "common_diseases": [
          "Anthracnose",
          "Powdery mildew",
          "Mango malformation"
        ],
        "plantation_time": "February–March",
        "planted_before": "Before 3–5 years (fruiting starts)"
      }
    }
  ]
}
 `
- ### /locationdata
  - Request Example:
    `
    {
    "lat": float,
    "long": float,
    "month": int
    }
    `
  - Response Example:
    `
    {
    "temperature": 26.27,
    "humidity": 81.1,
    "rainfall": 100
    }
    `
