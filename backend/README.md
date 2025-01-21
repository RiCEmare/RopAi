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
      "probability": 0.6524
    },
    {
      "name": "muskmelon",
      "probability": 0.1482
    },
    {
      "name": "orange",
      "probability": 0.1436
    },
    {
      "name": "mothbeans",
      "probability": 0.048
    },
    {
      "name": "mango",
      "probability": 0.0037
    },
    {
      "name": "chickpea",
      "probability": 0.0015
    },
    {
      "name": "pomegranate",
      "probability": 0.0005
    },
    {
      "name": "watermelon",
      "probability": 0.0004
    },
    {
      "name": "lentil",
      "probability": 0.0004
    },
    {
      "name": "mungbean",
      "probability": 0.0003
    },
    {
      "name": "maize",
      "probability": 0.0001
    },
    {
      "name": "pigeonpeas",
      "probability": 0.0001
    },
    {
      "name": "coconut",
      "probability": 0.0001
    },
    {
      "name": "coffee",
      "probability": 0.0001
    },
    {
      "name": "blackgram",
      "probability": 0.0001
    },
    {
      "name": "grapes",
      "probability": 0.0001
    },
    {
      "name": "apple",
      "probability": 0.0001
    },
    {
      "name": "cotton",
      "probability": 0.0001
    },
    {
      "name": "banana",
      "probability": 0.0001
    },
    {
      "name": "papaya",
      "probability": 0
    },
    {
      "name": "jute",
      "probability": 0
    },
    {
      "name": "rice",
      "probability": 0
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
- ### /cropinfo
  - Request Example:
    `
    {
    "name":"banana"
    }
    `
  - Response Example:
    `
    {
    "fact": "Bananas are technically berries, and the banana plant is the world's largest herb.",
    "common_diseases": [
      "Panama disease",
      "Sigatoka leaf spot",
      "Banana bunchy top virus"
    ],
    "plantation_time": "Throughout the year",
    "planted_before": "Before 9–12 months"
    }
    `
