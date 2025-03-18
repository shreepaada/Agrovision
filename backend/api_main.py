import os
import ee
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS 

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app) 

# Retrieve API key from environment variable
api_key = os.getenv("OPENCAGE_API_KEY")
if not api_key:
    raise ValueError("Error: OPENCAGE_API_KEY not found in environment variables.")

# Authenticate and initialize Google Earth Engine
try:
    ee.Initialize(project='tejaldaivajna8-test1')
except Exception as e:
    ee.Authenticate()
    ee.Initialize(project='tejaldaivajna8-test1')

# Default soil values for Indian states
soil_default_values = {
    "Andhra Pradesh": {"pH": 7.62, "Nitrogen": 200},
    "Arunachal Pradesh": {"pH": 4.53, "Nitrogen": 298},
    "Assam": {"pH": 4.81, "Nitrogen": 280},
    "Bihar": {"pH": 8.25, "Nitrogen": 214},
    "Chhattisgarh": {"pH": 6.30, "Nitrogen": 215},
    "Goa": {"pH": 6.00, "Nitrogen": 105},
    "Gujarat": {"pH": 7.67, "Nitrogen": 225},
    "Haryana": {"pH": 7.75, "Nitrogen": 125},
    "Himachal Pradesh": {"pH": 6.23, "Nitrogen": 230},
    "Jharkhand": {"pH": 5.90, "Nitrogen": 490},
    "Karnataka": {"pH": 5.49, "Nitrogen": 518},
    "Kerala": {"pH": 7.00, "Nitrogen": 230},
    "Maharashtra": {"pH": 5.96, "Nitrogen": 154},
    "Madhya Pradesh": {"pH": 7.45, "Nitrogen": 195},
    "Manipur": {"pH": 5.31, "Nitrogen": 267},
    "Meghalaya": {"pH": 5.16, "Nitrogen": 256},
    "Mizoram": {"pH": 5.10, "Nitrogen": 670},
    "Nagaland": {"pH": 5.17, "Nitrogen": 410},
    "Odisha": {"pH": 6.01, "Nitrogen": 230},
    "Punjab": {"pH": 8.25, "Nitrogen": 145},
    "Rajasthan": {"pH": 7.75, "Nitrogen": 230},
    "Sikkim": {"pH": 4.87, "Nitrogen": 300},
    "Tamil Nadu": {"pH": 7.12, "Nitrogen": 160},
    "Tripura": {"pH": 5.05, "Nitrogen": 400},
    "Telangana": {"pH": 6.12, "Nitrogen": 250},
    "Uttar Pradesh": {"pH": 8.14, "Nitrogen": 244},
    "Uttarakhand": {"pH": 5.70, "Nitrogen": 350},
    "West Bengal": {"pH": 5.55, "Nitrogen": 220},
    "Andaman and Nicobar Islands": {"pH": 4.05, "Nitrogen": 100},
    "Chandigarh": {"pH": 7.75, "Nitrogen": 170},
    "Dadra and Nagar Haveli and Daman and Diu": {"pH": 7.05, "Nitrogen": 400},
    "Delhi": {"pH": 7.58, "Nitrogen": 100},
    "Jammu & Kashmir": {"pH": 8.00, "Nitrogen": 190},
    "Ladakh": {"pH": 8.45, "Nitrogen": 350},
    "Lakshadweep": {"pH": 8.20, "Nitrogen": 180},
    "Puducherry": {"pH": 7.30, "Nitrogen": 190}
}

# Define route for home
@app.route('/')
def home():
    return jsonify({"message": "Crop Prediction API is running!"})

# Route to get NDVI, weather, and soil data
@app.route('/get-features', methods=['GET'])
def get_features():
    # Get latitude and longitude from query parameters
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)

    # Validate inputs
    if lat is None or lon is None:
        return jsonify({"error": "Latitude and Longitude are required!"}), 400

    # Fetch data
    features = get_crop_features(lat, lon)
    return jsonify(features)

def get_ndvi(lat, lon, date='2024-03-01'):
    """
    Fetch NDVI value using Google Earth Engine.
    """
    point = ee.Geometry.Point(lon, lat)
    
    # Use the latest MODIS NDVI dataset
    dataset = ee.ImageCollection('MODIS/061/MOD13A1') \
        .filterBounds(point) \
        .filterDate(ee.Date(date), ee.Date(date).advance(16, 'day')) \
        .select('NDVI')
    
    # Check if dataset contains images
    image_list = dataset.toList(dataset.size())
    image_count = image_list.size().getInfo()
    
    if image_count == 0:
        return None

    # Get the latest image
    image = dataset.sort('system:time_start', False).first()

    # Extract NDVI value
    ndvi = image.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=point,
        scale=500
    ).get('NDVI').getInfo()

    return ndvi / 10000 if ndvi else None  # MODIS NDVI is scaled by 10,000

def get_state_opencage(lat, lon):
    """
    Fetch state name using OpenCage Geocoding API.
    """
    url = f"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    
    if data["status"]["code"] == 200:
        return data["results"][0]["components"].get("state", "State not found")
    
    return "State not found"

def get_soil_ph(lat, lon):
    """
    Fetch soil pH using SoilGrids API.
    """
    url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}&property=phh2o&depth=0-5cm&value=mean"
    response = requests.get(url)
    
    if response.status_code != 200:
        return None
    
    try:
        data = response.json()
    except requests.exceptions.JSONDecodeError:
        return None

    if 'properties' in data and 'layers' in data['properties']:
        layer = data['properties']['layers'][0]
        depth = layer['depths'][0]
        
        if 'values' in depth and 'mean' in depth['values']:
            ph = depth['values']['mean']
            return ph / 10 if ph is not None else None  # Convert from pH*10 to actual pH

    return None

def get_soil_nitrogen(lat, lon):
    """
    Fetch soil nitrogen using SoilGrids API.
    """
    url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}&property=nitrogen&depth=0-5cm&value=mean"
    response = requests.get(url)
    
    if response.status_code != 200:
        return None
    
    try:
        data = response.json()
    except requests.exceptions.JSONDecodeError:
        return None

    if 'properties' in data and 'layers' in data['properties']:
        layer = data['properties']['layers'][0]
        depth = layer['depths'][0]
        
        if 'values' in depth and 'mean' in depth['values']:
            nitrogen = depth['values']['mean']
            return nitrogen if nitrogen is not None else None

    return None

def get_weather(lat, lon, start_date='2024-03-01', end_date='2024-03-01'):
    """
    Fetch weather data (temperature, humidity, rainfall) using NASA POWER API.
    """
    url = f"https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,RH2M,PRECTOTCORR&community=AG&longitude={lon}&latitude={lat}&start={start_date.replace('-', '')}&end={end_date.replace('-', '')}&format=JSON"
    response = requests.get(url)
    data = response.json()
    
    if 'properties' in data:
        temperature = data['properties']['parameter']['T2M'][start_date.replace('-', '')]
        humidity = data['properties']['parameter']['RH2M'][start_date.replace('-', '')]
        rainfall = data['properties']['parameter']['PRECTOTCORR'][start_date.replace('-', '')]
        
        return {
            "temperature": temperature,
            "humidity": humidity,
            "rainfall": rainfall
        }
    return None

def get_crop_features(lat, lon):
    """
    Fetch crop-related features (NDVI, soil properties, weather).
    """
    ndvi = get_ndvi(lat, lon)
    weather = get_weather(lat, lon)
    soil_ph = get_soil_ph(lat, lon)
    soil_nitrogen = get_soil_nitrogen(lat, lon)
    
    # Fallback to default soil values if SoilGrids API fails
    state_name = get_state_opencage(lat, lon)
    if state_name in soil_default_values:
        soil_ph = soil_ph if soil_ph is not None else soil_default_values[state_name]["pH"]
        soil_nitrogen = soil_nitrogen if soil_nitrogen is not None else soil_default_values[state_name]["Nitrogen"]

    return {
        "NDVI": ndvi,
        "Soil pH": soil_ph,
        "Soil Nitrogen": soil_nitrogen,
        "Temperature (°C)": weather['temperature'] if weather else None,
        "Humidity (%)": weather['humidity'] if weather else None,
        "Rainfall (mm)": weather['rainfall'] if weather else None
    }

# Run Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
# import ee
# import geemap
# import requests

# soil_default_values = {
#     "Andhra Pradesh": {"pH": 7.62, "Nitrogen": 200},
#     "Arunachal Pradesh": {"pH": 4.53, "Nitrogen": 298},
#     "Assam": {"pH": 4.81, "Nitrogen": 280},
#     "Bihar": {"pH": 8.25, "Nitrogen": 214},
#     "Chhattisgarh": {"pH": 6.30, "Nitrogen": 215},
#     "Goa": {"pH": 6.00, "Nitrogen": 105},
#     "Gujarat": {"pH": 7.67, "Nitrogen": 225},
#     "Haryana": {"pH": 7.75, "Nitrogen": 125},
#     "Himachal Pradesh": {"pH": 6.23, "Nitrogen": 230},
#     "Jharkhand": {"pH": 5.90, "Nitrogen": 490},
#     "Karnataka": {"pH": 5.49, "Nitrogen": 518},
#     "Kerala": {"pH": 7.00, "Nitrogen": 230},
#     "Maharashtra": {"pH": 5.96, "Nitrogen": 154},
#     "Madhya Pradesh": {"pH": 7.45, "Nitrogen": 195},
#     "Manipur": {"pH": 5.31, "Nitrogen": 267},
#     "Meghalaya": {"pH": 5.16, "Nitrogen": 256},
#     "Mizoram": {"pH": 5.10, "Nitrogen": 670},
#     "Nagaland": {"pH": 5.17, "Nitrogen": 410},
#     "Odisha": {"pH": 6.01, "Nitrogen": 230},
#     "Punjab": {"pH": 8.25, "Nitrogen": 145},
#     "Rajasthan": {"pH": 7.75, "Nitrogen": 230},
#     "Sikkim": {"pH": 4.87, "Nitrogen": 300},
#     "Tamil Nadu": {"pH": 7.12, "Nitrogen": 160},
#     "Tripura": {"pH": 5.05, "Nitrogen": 400},
#     "Telangana": {"pH": 6.12, "Nitrogen": 250},
#     "Uttar Pradesh": {"pH": 8.14, "Nitrogen": 244},
#     "Uttarakhand": {"pH": 5.70, "Nitrogen": 350},
#     "West Bengal": {"pH": 5.55, "Nitrogen": 220},
#     "Andaman and Nicobar Islands": {"pH": 4.05, "Nitrogen": 100},
#     "Chandigarh": {"pH": 7.75, "Nitrogen": 170},
#     "Dadra and Nagar Haveli and Daman and Diu": {"pH": 7.05, "Nitrogen": 400},
#     "Delhi": {"pH": 7.58, "Nitrogen": 100},
#     "Jammu & Kashmir": {"pH": 8.00, "Nitrogen": 190},
#     "Ladakh": {"pH": 8.45, "Nitrogen": 350},
#     "Lakshadweep": {"pH": 8.20, "Nitrogen": 180},
#     "Puducherry": {"pH": 7.30, "Nitrogen": 190}
# }

# # Authenticate and initialize GEE
# try:
#     ee.Initialize(project='tejaldaivajna8-test1')
# except Exception as e:
#     ee.Authenticate()
#     ee.Initialize(project='tejaldaivajna8-test1')

# def get_ndvi(lat, lon, date='2024-03-01'):
#     point = ee.Geometry.Point(lon, lat)
    
#     # Use the latest MODIS NDVI dataset
#     dataset = ee.ImageCollection('MODIS/061/MOD13A1') \
#         .filterBounds(point) \
#         .filterDate(ee.Date(date), ee.Date(date).advance(16, 'day')) \
#         .select('NDVI')
    
#     # Check if dataset contains images
#     image_list = dataset.toList(dataset.size())
#     image_count = image_list.size().getInfo()
    
#     if image_count == 0:
#         print("No MODIS NDVI images found for this location and date range.")
#         return None

#     # Print available images (for debugging)
#     print("Available Image IDs:", [image_list.get(i).getInfo()['id'] for i in range(image_count)])

#     # Get the latest image
#     image = dataset.sort('system:time_start', False).first()

#     # Extract NDVI value
#     ndvi = image.reduceRegion(
#         reducer=ee.Reducer.mean(),
#         geometry=point,
#         scale=500
#     ).get('NDVI').getInfo()

#     return ndvi / 10000 if ndvi else None  # MODIS NDVI is scaled by 10,000

# def get_state_opencage(lat, lon, api_key):
#     url = f"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={api_key}"
#     response = requests.get(url)
#     data = response.json()
    
#     if data["status"]["code"] == 200:
#         for component in data["results"][0]["components"]:
#             if "state" in data["results"][0]["components"]:
#                 return data["results"][0]["components"]["state"]
#     return "State not found"

# # def get_all_states(api_key):
# #     # Sample coordinates from different UTs of India
# #     coordinates = [
# #         (11.667, 92.740),  # Port Blair
# #         (30.7333, 76.7794),  # Chandigarh city
# #         (20.3974, 72.8328),  # Daman
# #         (28.7041, 77.1025),  # New Delhi
# #         (34.0837, 74.7973),  # Srinagar
# #         (34.1526, 77.5770),  # Leh
# #         (10.5667, 72.6417),  # Kavaratti
# #         (11.9139, 79.8145),  # Puducherry city
# #     ]
    
# #     states = set()
    
# #     for lat, lon in coordinates:
# #         state = get_state_opencage(lat, lon, api_key)
# #         if state != "State not found":
# #             states.add(state)
    
# #     return states

# def get_soil_ph(lat, lon):
#     url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}&property=phh2o&depth=0-5cm&value=mean"
    
#     response = requests.get(url)
    
#     if response.status_code != 200:
#         print(f"Error: Received status code {response.status_code} from SoilGrids API")
#         return None
    
#     try:
#         data = response.json()
#         print("SoilGrids API Response:", data)  # Debugging
#     except requests.exceptions.JSONDecodeError:
#         print("Error: Unable to decode JSON response. Response text:", response.text)
#         return None

#     # Check if the necessary keys exist
#     if 'properties' in data and 'layers' in data['properties']:
#         layer = data['properties']['layers'][0]
#         depth = layer['depths'][0]
        
#         if 'values' in depth and 'mean' in depth['values']:
#             ph = depth['values']['mean']
#             if ph is not None:
#                 return ph / 10  # Convert from pH*10 to actual pH
#             else:
#                 print("Warning: No soil pH data available for this location.")
#                 return None

#     print("Error: Unexpected response format")
#     return None


# def get_soil_nitrogen(lat, lon):
#     url = f"https://rest.isric.org/soilgrids/v2.0/properties/query?lon={lon}&lat={lat}&property=nitrogen&depth=0-5cm&value=mean"
    
#     response = requests.get(url)
    
#     if response.status_code != 200:
#         print(f"Error: Received status code {response.status_code} from SoilGrids API")
#         return None
    
#     try:
#         data = response.json()
#         print("SoilGrids API Response:", data)  # Debugging
#     except requests.exceptions.JSONDecodeError:
#         print("Error: Unable to decode JSON response. Response text:", response.text)
#         return None

#     # Check if the necessary keys exist
#     if 'properties' in data and 'layers' in data['properties']:
#         layer = data['properties']['layers'][0]
#         depth = layer['depths'][0]
        
#         if 'values' in depth and 'mean' in depth['values']:
#             nitrogen = depth['values']['mean']
#             if nitrogen is not None:
#                 return nitrogen
#             else:
#                 print("Warning: No soil nitrogen data available for this location.")
#                 return None

#     print("Error: Unexpected response format")
#     return None

# def get_soil_features_with_fallback(lat, lon, api_key):
#     ph_value = get_soil_ph(lat, lon)
#     nitrogen_value = get_soil_nitrogen(lat, lon)
    
#     if ph_value is not None and nitrogen_value is not None:
#         return {"pH": ph_value, "Nitrogen": nitrogen_value}
    
#     print("Falling back to default state-wise soil values...")
#     state_name = get_state_opencage(lat, lon, api_key)
    
#     if state_name and state_name in soil_default_values:
#         return {
#             "pH": ph_value if ph_value is not None else soil_default_values[state_name]["pH"],
#             "Nitrogen": nitrogen_value if nitrogen_value is not None else soil_default_values[state_name]["Nitrogen"]
#         }
    
#     print("Warning: State not found in default values. Returning None.")
#     return {"pH": None, "Nitrogen": None}


# def get_weather(lat, lon, start_date='2024-03-01', end_date='2024-03-01'):
#     url = f"https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,RH2M,PRECTOTCORR&community=AG&longitude={lon}&latitude={lat}&start={start_date.replace('-', '')}&end={end_date.replace('-', '')}&format=JSON"
    
#     response = requests.get(url)
#     data = response.json()
    
#     if 'properties' in data:
#         temperature = data['properties']['parameter']['T2M'][start_date.replace('-', '')]
#         humidity = data['properties']['parameter']['RH2M'][start_date.replace('-', '')]
#         rainfall = data['properties']['parameter']['PRECTOTCORR'][start_date.replace('-', '')]
        
#         return {
#             "temperature": temperature,  # °C
#             "humidity": humidity,  # %
#             "rainfall": rainfall  # mm
#         }
#     return None

# def get_crop_features(lat, lon, api_key, date='2024-03-01'):
#     ndvi = get_ndvi(lat, lon, date)
#     weather = get_weather(lat, lon, date)
#     soil_features = get_soil_features_with_fallback(lat, lon, api_key)

#     return {
#         "NDVI": ndvi,
#         "Soil pH": soil_features["pH"],
#         "Soil Nitrogen": soil_features["Nitrogen"],
#         "Temperature (°C)": weather['temperature'] if weather else None,
#         "Humidity (%)": weather['humidity'] if weather else None,
#         "Rainfall (mm)": weather['rainfall'] if weather else None
#     }

# if __name__ == "__main__":
#     lat, lon = 12.6168187, 77.4426732
#     api_key = "6d0e90511f9847a68f6987f9b61acfba"  # Get from https://opencagedata.com

# #     # state = get_state_opencage(lat, lon, api_key)
# #     # print(f"The coordinates belong to: {state}")

# #     # s = get_all_states(api_key)
# #     # print(s)

#     features = get_crop_features(lat, lon, api_key)
#     print(features)



# # Output for (lat, lon) = (12.6168187, 77.4426732)
# # {'NDVI': 0.3742, 'Soil pH': 6.5, 'Soil Nitrogen': 154, 'Temperature (°C)': 25.67, 'Humidity (%)': 46.05, 'Rainfall (mm)': 0.0}
