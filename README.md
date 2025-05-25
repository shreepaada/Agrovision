# AgroVision
## Project Description
AgroVision: Precision Farming Insights using AI is a geospatial crop recommendation system that leverages satellite imagery, soil data, and weather data to suggest the most suitable crop for any given geographical location. The system is designed to aid farmers and agricultural planners in optimizing land usage, improving crop yield, and reducing the overuse of water and fertilizers.

AgroVision integrates and processes multi-dimensional environmental data from globally available sources and uses a machine learning model to deliver accurate, location-specific crop recommendations. It also identifies barren or underutilized land and suggests rehabilitation strategies, making it scalable and applicable across diverse agro-ecological zones.

## How it works
###### User Input: 
Geographic coordinates are entered manually or selected via an interactive map.

###### Data Collection:
NDVI (Vegetation Health) via MODIS using Google Earth Engine
Soil parameters (pH and nitrogen) from ISRIC SoilGrids
Weather data (temperature, humidity, rainfall) from NASA POWER

###### Processing Pipeline:
All parameters are normalized and integrated.
Passed into a trained LightGBM model for crop prediction.

###### Output Generation:
Top crop recommendation with precision farming insights (irrigation, fertilizers, alt. crops).
Rehabilitation advice for barren or low-NDVI areas.

## Tech Stack
###### Frontend: 
HTML, CSS, JavaScript
Hosted on: Vercel

###### Backend: 
Python (Flask)
API calls for geospatial data processing
Deployed on: Render

###### Machine Learning: 
LightGBM (trained on crop-environment suitability dataset)

###### Data Sources / APIs:
Google Earth Engine (MODIS)
ISRIC SoilGrids
NASA POWER
OpenCage Geocoder (fallback for soil data)
ICFA crop dataset

# System Design
![Design](https://github.com/user-attachments/assets/4c3cb6c8-4a85-4a9a-9508-cd01909bfde0)
