"use client";
import { useEffect, useState } from "react";
import allCrops, { CropInfo } from "./cropdata";
declare global {
  interface Window {
    initMap: () => void;
  }
}
const Insights = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState("");
  const [cropInfo, setCropInfo] = useState<CropInfo | null>(null);
  const [otherCrops, setOtherCrops] = useState<string[]>([]);

  // Load Google Maps Script
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("googleMapsScript")
    ) {
      const script = document.createElement("script");
      script.id = "googleMapsScript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;

      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    }
  }, []);

  // Initialize Google Map
  const initMap = () => {
    const defaultLocation = { lat: 20, lng: 77 };
    const map = new google.maps.Map(document.getElementById("map")!, {
      center: defaultLocation,
      zoom: 5,
    });

    let marker: google.maps.Marker | null = null;

    map.addListener("click", (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
      if (latLng) {
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        setLat(latitude.toString());
        setLon(longitude.toString());

        if (marker) {
          marker.setPosition({
            lat: parseFloat(latitude.toString()),
            lng: parseFloat(longitude.toString())
          });
        } else {
          marker = new google.maps.Marker({
            position: {
              lat: parseFloat(latitude.toString()),
              lng: parseFloat(longitude.toString())
            },
            map,
            title: "Selected Location",
          });
        }

        map.setCenter({
          lat: parseFloat(latitude.toString()),
          lng: parseFloat(longitude.toString())
        });
      }
    });
  };

  const fetchInsights = async () => {
    if (!lat || !lon) {
      setError("Please enter valid latitude and longitude.");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);
    setCropInfo(null);
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-crop-recommendation?lat=${lat}&lon=${lon}`;
    console.log("Fetching from:", apiUrl);
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch insights data.");
      }

      const result = await response.json();
      console.log("API Result:", result);
      setData(result);

      if (result["Recommended Crop"]) {
        const recommendedCrop = result["Recommended Crop"];
        const cropKey = Object.keys(allCrops).find(
          (key) => key.toLowerCase() === recommendedCrop.toLowerCase()
        );

        if (cropKey) {
          setCropInfo(allCrops[cropKey]);
        } else {
          console.warn(`No crop data found for: "${recommendedCrop}"`);
        }
        fetchTopCrops(lat, lon);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopCrops = async (lat: string, lon: string) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-top-3-crops?lat=${lat}&lon=${lon}`;
    console.log("Fetching top 3 crops from:", apiUrl);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch top 3 crops");
      }

      const result = await response.json();
      if (result && result["Top 3 Crops"]) {
        const allTopCrops = result["Top 3 Crops"].map((item: any) => item.crop);
        const additionalCrops = allTopCrops.slice(1, 4); // Skip the main crop
        setOtherCrops(additionalCrops);
      }
    } catch (error) {
      console.error("Error fetching top crops:", error);
      setOtherCrops([]);
    }
  };


  const renderNDVIMessage = (ndvi: number | null) => {
    if (ndvi === null || isNaN(ndvi)) return null;

    if (ndvi <= 0) {
      return (
        <>
          <p className="text-gray-600 text-sm mt-2">
            The coordinates you entered indicate water or non-vegetated land features.
          </p>
          <p className="text-gray-600 text-sm mt-2 font-semibold">
            (Show soil and weather data but don’t show crop recommendation for this area even if available)
          </p>
        </>
      );
    } else if (ndvi > 0 && ndvi <= 0.3) {
      return (
        <>
          <p className="text-gray-600 text-sm mt-2">
            The coordinates you entered indicate a barren land. Just because this land currently has little to no vegetation, doesn’t mean all hope is lost! More often than not, we simply haven’t unlocked the land’s full potential. Here are some methods to improve its quality:
          </p>
          <ul className="text-sm text-gray-700 list-disc ml-6 mt-2 space-y-4 leading-relaxed">
          <li>
              <span className="text-black font-semibold">Assessing the Root Cause:</span> Barren land can result from factors such as soil degradation, inadequate water availability, or nutrient deficiency. Conducting comprehensive soil tests, analyzing rainfall patterns, and identifying the root causes of barrenness will help in designing a targeted approach for restoration.
            </li>
            <li>
              <span className="text-black font-semibold">Soil Restoration and Fertility Improvement:</span> To enhance barren land, soil restoration techniques play a pivotal role. This involves various activities such as mulching, composting, and adding organic matter to improve soil structure and fertility. Composting green waste, livestock manure, or food scraps provides rich nutrients that encourage vegetation growth. Additionally, implementing cover cropping and crop rotation helps prevent erosion, reduces weed growth, and enriches the soil.
            </li>
            <li>
              <span className="text-black font-semibold">Water Management and Conservation:</span> Implementing water management techniques such as rainwater harvesting, contour farming, or constructing irrigation channels can enhance water availability for vegetation growth. Utilizing efficient irrigation methods, like drip irrigation or precision sprinklers, minimizes water wastage and improves plant survival rates.
            </li>
            <li>
              <span className="text-black font-semibold">Native Plant Species Introduction:</span> Native plants are adapted to local climatic conditions and possess the ecological resilience necessary for thriving in a specific ecosystem. These plants help improve soil quality, prevent erosion, attract pollinators, and restore the balance of the local ecosystem by providing food and shelter for various wildlife species.
            </li>
            <li>
              <span className="text-black font-semibold">Conservation and Land Management:</span> Preserving and conserving the regenerated vegetation and biodiversity is essential for the long-term success of barren land restoration. This can be achieved through sustainable land management practices, such as controlled grazing, responsible land use planning, and the establishment of protected areas. Involving local communities, educating them about the importance of biodiversity, and engaging them in conservation efforts fosters a sense of ownership and ensures the longevity of restoration initiatives.
            </li>
            <li>
              <span className="text-black font-semibold">Technological Innovations:</span> Implementing advanced techniques like hydroseeding, where a mixture of seeds, fertilizers, and mulch is sprayed onto the land, accelerates vegetation growth. Similarly, using drone technology to identify areas most in need of restoration and monitoring their progress enables efficient use of resources and maximizes the effectiveness of restoration efforts.
            </li>
          </ul>
          <p className="text-gray-600 text-sm mt-2 font-semibold">
            Continue reading below to find a crop most suited for your land!
          </p>
        </>
      );
    } else if (ndvi > 0.3 && ndvi <= 0.6) {
      return (
        <p className="text-gray-600 text-sm mt-2">
          The coordinates you entered point to a land with some existing vegetation cover! With the right care and improvements, this land has the potential to become even more productive. If you're interested in optimizing its use, check out the crop recommendation below!
        </p>
      );
    } else if (ndvi > 0.6 && ndvi <= 0.9) {
      return (
        <p className="text-gray-600 text-sm mt-2">
          The coordinates you entered point to a land with a dense and heavy vegetation cover! It seems like you’re making great use of your land already, and the plants you're growing are thriving! But if you are looking to expand your plant collection, check out the crop recommendation below.
        </p>
      );
    } else if (ndvi > 0.9) {
      return (
        <p className="text-gray-600 text-sm mt-2">
          The coordinates you entered point to a land with very dense vegetation cover - perhaps a rainforest? You may not need to grow more plants here, but if you're curious about the best-suited crop for this land, check out the recommendation below.
        </p>
      );
    }

    return null;
  };

  const ndviValue = data?.NDVI ?? null;
  return (
    <section className="w-full px-8 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-semibold mb-6">Agricultural Insights 🌾</h2>

      {/* Latitude & Longitude Inputs */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="number"
          placeholder="Enter Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Enter Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-auto"
        />
        <button
          onClick={fetchInsights}
          className="bg-green-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-green-600 active:scale-95"
        >
          Get Insights
        </button>
      </div>

      {/* Interactive Map */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">📍 Select Location on Map</h3>
        <div id="map" style={{ height: "400px", width: "100%" }} className="rounded-lg shadow-md"></div>
        {lat && lon && (
          <p className="mt-2 text-sm text-gray-600">
            Selected Coordinates: <strong>{lat}, {lon}</strong>
          </p>
        )}
      </div>

      {/* Loading / Error / Results */}
      {loading && <p className="mt-4 text-gray-500">Loading insights...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {data && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-600">🌍 NDVI Analysis</h3>
            <p><strong>NDVI Value:</strong> {ndviValue ?? "N/A"}</p>
            {renderNDVIMessage(ndviValue)}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-600">Soil & Weather Insights</h3>
            <ul className="space-y-2">
              <li><strong>🧪 Soil pH:</strong> {data["Soil pH"] ?? "N/A"}</li>
              <li><strong>🌾 Soil Nitrogen:</strong> {data["Soil Nitrogen"] ?? "N/A"}</li>
              <li><strong>🌡️ Temperature (°C):</strong> {data["Temperature (°C)"] ?? "N/A"}</li>
              <li><strong>💧 Humidity (%):</strong> {data["Humidity (%)"] ?? "N/A"}</li>
              <li><strong>🌧️ Rainfall (mm):</strong> {data["Rainfall (mm)"] ?? "N/A"}</li>
            </ul>
          </div>

          {/* Only show crop recommendation if NDVI > 0 */}
          {ndviValue > 0 && cropInfo && (
            <div className="mt-6 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600">🌱 Recommended Crop</h3>
              <h2 className="text-2xl font-bold text-center text-green-700 mt-4 mb-2">
  {cropInfo.name}
</h2>


              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                {cropInfo.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${cropInfo.name} image ${i + 1}`}
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2 text-gray-800">Benefits:</h4>
                <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                  {cropInfo.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-sm text-gray-700 leading-relaxed space-y-2">
                <p><strong>Soil:</strong> {cropInfo.insights.soil}</p>
                <p><strong>pH Range:</strong> {cropInfo.insights.pH}</p>
                <p><strong>Irrigation:</strong> {cropInfo.insights.irrigation}</p>
                <p><strong>Temperature:</strong> {cropInfo.insights.temperature}</p>
                <p><strong>Fertilization:</strong> {cropInfo.insights.fertilization}</p>
                <p><strong>Technology:</strong> {cropInfo.insights.technology}</p>
              </div>
            </div>
          )}
          {ndviValue > 0 && cropInfo && otherCrops.length > 0 && (
  <div className="mt-6 bg-white p-4 rounded shadow-sm">
    <h4 className="text-md font-semibold mb-2 text-gray-800">Alternative crops:</h4>
    <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
      {otherCrops.map((crop, index) => (
        <li key={index}>{crop}</li>
        // insights
      ))}
    </ul>
  </div>
)}

        </div>
        
      )}
    </section>
  );
};

export default Insights;