"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { Line, Radar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

// NDVI Line Chart Data
const ndviData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "NDVI Value",
      data: [0.2, 0.4, 0.6, 0.3, 0.7, 0.8, 0.9],
      borderColor: "green",
      backgroundColor: "rgba(0,128,0,0.2)",
      fill: true,
    },
  ],
};
const ndviOptions = { responsive: true };

// Weather Radar Chart Data
const weatherData = {
  labels: ["Temperature", "Humidity", "Rainfall", "Soil pH", "Nitrogen"],
  datasets: [
    {
      label: "Optimal Conditions",
      data: [25, 60, 1000, 6.5, 200],
      borderColor: "blue",
      backgroundColor: "rgba(0,0,255,0.2)",
    },
  ],
};
const weatherOptions = { responsive: true };

const AboutPage = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="/about1.jpg"
        subheading="Understanding NDVI"
        heading="Analyzing Crop Health with NDVI"
      >
        <NDVIContent />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/about2.webp"
        subheading="Weather & Soil"
        heading="How Rainfall & Soil Affect Crops"
      >
        <WeatherSoilContent />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/about3.png"
        subheading="Frequently Asked Questions"
        heading="Your Questions Answered"
      >
        <FAQContent />
      </TextParallaxContent>
    </div>
  );
};

interface TextParallaxProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}

const TextParallaxContent: React.FC<TextParallaxProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <div className="p-8">
      <div className="relative h-[120vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - 24px)`,
        top: 12,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        style={{ opacity }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-xl">{subheading}</p>
      <p className="text-4xl font-bold text-center">{heading}</p>
    </motion.div>
  );
};

const NDVIContent = () => (
  <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row items-center gap-8">
    
    <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-bold text-black">How NDVI Helps Farmers</h2>
      <p className="text-lg text-gray-600 mt-4 leading-relaxed">
        NDVI (Normalized Difference Vegetation Index) helps measure crop health using satellite imagery.
        <br />
        - High NDVI (0.6 - 1.0): Indicates lush, healthy vegetation.  
        - Medium NDVI (0.2 - 0.6): Suggests growing vegetation.  
        - Low NDVI (0.0 - 0.2): May indicate dry or barren land.  

        Farmers use NDVI to detect crop stress, optimize irrigation, and predict yield.
      </p>
    </div>

    
    <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
      <Line data={ndviData} options={ndviOptions} width={400} height={250} />
    </div>
  </div>
);




const WeatherSoilContent = () => (
  <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row items-center gap-8">
    
    <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-bold text-black">The Role of Rainfall & Soil in Agriculture</h2>
      <p className="text-lg text-gray-600 mt-4 leading-relaxed">
        Crop selection depends on environmental factors like soil pH, rainfall, and temperature.  
        - Soil pH:  
          - Acidic (pH 5-6) → Best for coffee, tea, potatoes.  
          - Neutral (pH 6-7) → Best for wheat, corn, barley.  
        - Rainfall:  
          - Rice needs 1200-2000mm rainfall.  
          - Wheat needs only 300-700mm.  
        - Temperature:  
          - Wheat grows best in 10-25°C, rice in 20-35°C, and coffee in 18-22°C.
      </p>
    </div>

    
    <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
      <Radar data={weatherData} options={weatherOptions} width={400} height={250} />
    </div>
  </div>
);




const FAQContent = () => (
  <div className="max-w-4xl mx-auto py-12 px-6">
    <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
    <div className="mt-6 space-y-4">
      <details className="bg-gray-100 p-4 rounded-md">
        <summary className="cursor-pointer font-semibold">How is NDVI calculated?</summary>
        <p className="text-gray-600 mt-2">
          NDVI is calculated as (NIR - Red) / (NIR + Red). Satellite sensors detect
          these bands and help determine green cover health.
        </p>
      </details>
      <details className="bg-gray-100 p-4 rounded-md">
        <summary className="cursor-pointer font-semibold">How does rainfall affect crops?</summary>
        <p className="text-gray-600 mt-2">
          Excess rainfall can cause waterlogging while deficit can cause drought stress. Crops need
          specific ranges – for example, rice prefers 1200-2000mm, wheat 300-700mm.
        </p>
      </details>
    </div>
  </div>
);

export default AboutPage;
