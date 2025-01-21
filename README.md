# Rop.AI

RopAi is a tool designed to assist farmers in determining the best crop to plant based
on geolocation, soil composition, and weather data. This addresses the common
challenge where farmers lack access to insights on maximizing crop yield. 

This app recommends the crops with the highest yeild possibility using
- Soil characteristics - `Nitrogen`,`Phosphorus`,`Potassium`,`pH value`
- Time and Location - `Lat & Long (Can be selected on map)`, `Month`

Currently, it provides recommendations from among 22 types of crops. Find them [here](backend/crop_list.txt)

# Running Locally
## 1. Running the backend server
```
cd backend
```
- Rename `.env.example` to `.env` and replace its `API_KEY` with your [OpenWeatherMap Statistical Weather Data API](https://openweathermap.org/api/statistics-api) key.
  - If you dont have one and are a student then you can apply for their *student program* and get it for free.
- Create a virtual environment if necessary.
```
pip install -r requirements.txt
```
```
uvicorn main:app --reload
```
#### This hosts the backend at `localhost:8000`

## 2. Running the Website
Download Node.js and npm on your system from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
```
cd frontend
```
```
npm install
```
```
npm start
```
#### This launches the site at `localhost:3000`

# Model Description

This app uses an `XGBoost` model custom trained on the [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset).
For more details on the data preprocessing, model training and results, checkout `backend/ropai-draft1.ipynb` or the [Kaggle Notebook](https://www.kaggle.com/code/ibliss/ropai-draft1).


# The Team
- [Swastik Aryal](https://github.com/Swastik-Aryal)
- [Rikesh Panta](https://github.com/RiCEmare)
- [Asim Poudel](https://github.com/aism-poudel)

