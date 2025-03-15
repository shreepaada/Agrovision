from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ee
import numpy as np
import joblib
import sqlite3
import uvicorn
import tensorflow as tf
from sklearn.ensemble import RandomForestClassifier
import requests

# Google Earth Engine Authentication using Service Account
SERVICE_ACCOUNT_JSON = "agrovision-440119-85e1068b4557.json"  # Ensure this file is present in your project directory

# Tomorrow.io API Key (Replace with your actual API key)
TOMORROW_API_KEY = "yAPYBgNdf0moS6LVdxQj5oKoTcxqO2xU"


def initialize_gee():
    try:
        credentials = ee.ServiceAccountCredentials(None, SERVICE_ACCOUNT_JSON)
        ee.Initialize(credentials)
        print("Google Earth Engine authenticated successfully!")
    except Exception as e:
        raise Exception(f"GEE Authentication Failed: {e}")

initialize_gee()  # Initialize GEE before using it

# FastAPI initialization
app = FastAPI()

# Database setup
conn = sqlite3.connect("agrovision.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS crop_data (
                    id INTEGER PRIMARY KEY,
                    region TEXT,
                    soil_type TEXT,
                    soil_ph REAL,
                    temperature REAL,
                    rainfall REAL,
                    humidity REAL,
                    ndvi REAL,
                    crop_suggestion TEXT)''')
conn.commit()

# Load or train a model

# Function to get NDVI from Google Earth Engine
def get_ndvi(lat, lon):
    try:
        point = ee.Geometry.Point(lon, lat)
        image = ee.ImageCollection("COPERNICUS/S2") \
            .filterBounds(point) \
            .filterDate("2024-01-01", "2024-12-31") \
            .sort("CLOUDY_PIXEL_PERCENTAGE") \
            .first()
        
        ndvi = image.normalizedDifference(["B8", "B4"]).reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=point,
            scale=30
        )
        return ndvi.get("nd").getInfo()
    except Exception as e:
        print(f"Error fetching NDVI: {e}")
        return None

# Function to get Weather Data from Tomorrow.io API
def get_weather_data(lat, lon):
    try:
        url = f"https://api.tomorrow.io/v4/weather/realtime?location={lat},{lon}&apikey={TOMORROW_API_KEY}"
        response = requests.get(url)
        data = response.json()

        if "data" not in data or "values" not in data["data"]:
            print(f"⚠️ Tomorrow.io API Error: {data}")  # Log API error
            return None, None, None

        temperature = data["data"]["values"].get("temperature", None)
        humidity = data["data"]["values"].get("humidity", None)
        rainfall = data["data"]["values"].get("precipitationIntensity")  # Default 0 if no rain data

        return temperature, humidity, rainfall

    except Exception as e:
        print(f"❌ Error fetching weather data: {e}")
        return None, None, None

# API Request Model
class CropRequest(BaseModel):
    latitude: float
    longitude: float
    soil_type: str
    soil_ph: float

# API Endpoint to predict crop recommendation
@app.post("/recommend_crop/")
def recommend_crop(request: CropRequest):
    try:
        ndvi_value = get_ndvi(request.latitude, request.longitude)
        if ndvi_value is None:
            raise HTTPException(status_code=500, detail="Failed to retrieve NDVI value")
        
        temperature, humidity, rainfall = get_weather_data(request.latitude, request.longitude)
        if temperature is None or humidity is None:
            raise HTTPException(status_code=500, detail="Failed to retrieve weather data")
        
        prediction = model.predict([[ndvi_value, request.soil_ph, temperature, rainfall, humidity]])[0]
        cursor.execute("INSERT INTO crop_data (region, soil_type, soil_ph, temperature, rainfall, humidity, ndvi, crop_suggestion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                       (f"{request.latitude},{request.longitude}", request.soil_type, request.soil_ph, temperature, rainfall, humidity, ndvi_value, prediction))
        conn.commit()
        
        return {
            "Recommended Crop": prediction,
            "NDVI Value": ndvi_value,
            "Temperature": temperature,
            "Rainfall": rainfall,
            "Humidity": humidity
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)