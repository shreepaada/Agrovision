import pandas as pd
import numpy as np
import joblib
import api_main

api_key = "6d0e90511f9847a68f6987f9b61acfba"

lat = float(input('Enter the latitude: '))
lon = float(input('Enter the longitude: '))

features = api_main.get_crop_features(lat, lon, api_key)

received_values = [value for key, value in features.items() if key != 'NDVI']
received_array = np.array(received_values).reshape(1, -1)

NaiveBayes = joblib.load("NaiveBayes.pkl")
prediction = NaiveBayes.predict(received_array)

ndvi = list(features.keys())[0]
print(f"\n{ndvi} = {features[ndvi]}\n")

print("\nSoil Data:\n")
for key in list(features.keys())[1:3]:
    print(f"{key} = {features[key]}")

print("\nWeather Data:\n")
for key in list(features.keys())[3:]:
    print(f"{key}: {features[key]}")

print("\nRecommended Crop:", prediction[0])