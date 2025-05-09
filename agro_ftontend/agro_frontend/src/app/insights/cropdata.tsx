export type CropInfo = {
    name: string;
    type: string;
    benefits: string[];
    insights: {
        soil: string;
        pH: string;
        irrigation: string;
        temperature: string;
        fertilization: string;
        technology: string;
    };
    images: string[]; // Changed from `image: string` to `images: string[]`
};

export const allCrops: Record<string, CropInfo> = {
    rice: {
        name: "Rice",
        type: "Cereal crop (Staple food for more than half of the world's population)",
        benefits: [
            "Nutritional: Good source of carbohydrates, provides energy, and is low in fat.",
            "Economic: Major export commodity, supports millions of farmers.",
            "Environmental: Paddy fields help in carbon sequestration but can contribute to methane emissions."
        ],
        insights: {
            soil: "Prefers clayey or loamy soil with high water retention.",
            pH: "5.0–6.5 (slightly acidic).",
            irrigation: "Requires continuous flooding (5-10 cm water depth) during vegetative growth but needs drainage before harvesting.",
            temperature: "20–35°C (ideal for germination and growth).",
            fertilization: "Requires high nitrogen (urea-based fertilizers) and moderate phosphorus & potassium.",
            technology: "Use of drone-based spraying, automated irrigation, and sensor-based nutrient monitoring improves yield and reduces water usage."
        },
        images: [
            "/crops/rice1.jpeg", // Image 1
            "/crops/rice2.webp", // Image 2
            "/crops/rice3.png"   // Image 3
        ]
    },
    pigeonpeas: {
        name: "Pigeon Peas",
        type: "Legume / Pulse crop (Used as food and fodder, nitrogen-fixing plant)",
        benefits: [
            "Nutritional: High in protein, fiber, and essential amino acids.",
            "Soil Health: Improves soil fertility by fixing nitrogen from the air.",
            "Drought Resistance: Can withstand dry conditions, making it ideal for arid regions."
        ],
        insights: {
            soil: "Well-drained sandy loam to clay loam.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires minimal irrigation; drought-tolerant but benefits from light irrigation during flowering and pod formation.",
            temperature: "25–35°C (warm and tropical climate).",
            fertilization: "Requires phosphorus (P) and potassium (K); limited nitrogen fertilizer needed due to nitrogen-fixing ability.",
            technology: "Use of drip irrigation, soil moisture sensors, and seed treatment with Rhizobium bacteria enhances productivity."
        },
        images: [
            "/crops/pigeonpea1.jpeg", // Image 1
            "/crops/pigeonpea2.jpeg", // Image 2
            "/crops/pigeonpea3.jpeg"   // Image 3
        ]
    },
    coffee: {
        name: "Coffee",
        type: "Beverage crop (Commercially grown for its beans, which are roasted to make coffee)",
        benefits: [
            "Economic: High-value export crop supporting millions of farmers.",
            "Health: Contains antioxidants, improves brain function, and boosts metabolism.",
            "Environmental: Can be grown under agroforestry systems, supporting biodiversity."
        ],
        insights: {
            soil: "Well-drained volcanic, loamy, or sandy loam soil with good organic matter.",
            pH: "6.0–6.5 (slightly acidic).",
            irrigation: "Requires consistent moisture but is sensitive to waterlogging; drip irrigation is ideal.",
            temperature: "18–24°C (cool, humid climate); sensitive to frost.",
            fertilization: "Needs nitrogen (N), phosphorus (P), and potassium (K) in balanced amounts, with micronutrients like zinc and boron.",
            technology: "Automated irrigation, soil moisture sensors, and AI-based pest monitoring (for coffee rust and berry borer) improve yield and quality."
        },
        images: [
            "/crops/coffee1.jpeg", // Image 1
            "/crops/coffee2.webp", // Image 2
            "/crops/coffee3.webp"   // Image 3
        ]
    },
    maize: {
        name: "Maize",
        type: "Cereal crop (Used for food, fodder, and industrial purposes)",
        benefits: [
            "Nutritional: Rich in carbohydrates, fiber, and essential vitamins like B-complex.",
            "Economic: Versatile crop used in food, animal feed, biofuel, and industrial products.",
            "Soil Health: Can be grown in crop rotation systems to improve soil fertility."
        ],
        insights: {
            soil: "Well-drained loamy or sandy loam soil with high organic content.",
            pH: "5.8–7.2 (neutral to slightly acidic).",
            irrigation: "Requires moderate irrigation, with critical stages at germination, flowering, and grain filling. Drip irrigation enhances water efficiency.",
            temperature: "20–30°C (warm climate); sensitive to frost.",
            fertilization: "Requires high nitrogen (N), phosphorus (P), and potassium (K), especially during early growth stages.",
            technology: "Satellite imaging, drone-based fertilization, and AI-powered pest control (for fall armyworm and stem borer) improve yield and reduce losses."
        },
        images: [
            "/crops/maize1.jpeg", // Image 1
            "/crops/maize2.jpeg", // Image 2
            "/crops/maize3.webp"   // Image 3
        ]
    },
    jute: {
        name: "Jute",
        type: "Fiber crop (Used to produce eco-friendly textiles, ropes, and biodegradable packaging)",
        benefits: [
            "Economic: Major cash crop in textile and packaging industries.",
            "Environmental: 100% biodegradable and absorbs CO₂ at a high rate.",
            "Soil Health: Can be grown in crop rotation to improve soil fertility."
        ],
        insights: {
            soil: "Well-drained alluvial or loamy soil with high fertility.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires moderate irrigation with adequate moisture during germination and growth but should not be waterlogged.",
            temperature: "24–37°C (warm and humid climate).",
            fertilization: "Needs moderate nitrogen (N), phosphorus (P), and potassium (K); organic fertilizers improve fiber quality.",
            technology: "AI-based disease detection, precision irrigation, and sensor-driven nutrient management optimize yield and fiber quality."
        },
        images: [
            "/crops/jute1.jpeg", // Image 1
            "/crops/jute2.png", // Image 2
            "/crops/jute3.webp"   // Image 3
        ]
    },
    cotton: {
        name: "Cotton",
        type: "Fiber crop (Used in textiles, medical products, and industrial applications)",
        benefits: [
            "Economic: Major cash crop supporting textile industries worldwide.",
            "Environmental: Can be used in crop rotation to prevent soil depletion.",
            "Byproducts: Cottonseed oil is used in cooking, and cottonseed meal is used as animal feed."
        ],
        insights: {
            soil: "Well-drained sandy loam to clayey loam with good organic matter.",
            pH: "5.8–7.5 (neutral to slightly acidic).",
            irrigation: "Requires moderate to high irrigation, especially during flowering and boll formation; drip irrigation conserves water.",
            temperature: "25–35°C (warm climate); sensitive to frost and excessive humidity.",
            fertilization: "Needs high nitrogen (N), phosphorus (P), and potassium (K) for good fiber quality.",
            technology: "Satellite-based pest monitoring (for bollworms), AI-driven irrigation scheduling, and drone-based pesticide application enhance productivity."
        },
        images: [
            "/crops/cotton1.jpeg", // Image 1
            "/crops/cotton2.jpeg", // Image 2
            "/crops/cotton3.jpeg"   // Image 3
        ]
    },
    coconut: {
        name: "Coconut",
        type: "Perennial plantation crop (Used for food, oil, fiber, and industrial products)",
        benefits: [
            "Nutritional: Rich in healthy fats, electrolytes, and antioxidants.",
            "Economic: High-value crop used in food, cosmetics, and biofuel industries.",
            "Environmental: Helps in coastal stabilization and carbon sequestration."
        ],
        insights: {
            soil: "Well-drained sandy loam or alluvial soil with good organic matter.",
            pH: "5.5–7.5 (slightly acidic to neutral).",
            irrigation: "Requires regular watering, especially in dry seasons; drip irrigation enhances water efficiency.",
            temperature: "27–32°C (tropical climate); sensitive to frost.",
            fertilization: "Needs nitrogen (N), phosphorus (P), potassium (K), and boron for better nut yield.",
            technology: "IoT-based irrigation, drone monitoring for pest control (red palm weevil), and AI-driven nutrient management improve productivity and sustainability."
        },
        images: [
            "/crops/coconut1.jpeg", // Image 1
            "/crops/coconut2.webp", // Image 2
            "/crops/coconut3.webp"   // Image 3
        ]
    },
    papaya: {
        name: "Papaya",
        type: "Fruit crop (Grown for fresh consumption, juices, and medicinal uses)",
        benefits: [
            "Nutritional: Rich in vitamins A, C, and antioxidants; aids digestion.",
            "Economic: High-value cash crop with demand in fruit processing industries.",
            "Medicinal: Papain enzyme aids in digestion and is used in pharmaceuticals."
        ],
        insights: {
            soil: "Well-drained sandy loam or loamy soil with high organic matter.",
            pH: "5.5–7.0 (slightly acidic to neutral).",
            irrigation: "Requires moderate irrigation, especially during flowering and fruiting; drip irrigation is recommended.",
            temperature: "22–32°C (warm, tropical climate); sensitive to frost and waterlogging.",
            fertilization: "Needs nitrogen (N), phosphorus (P), potassium (K), and magnesium (Mg) for better fruit yield.",
            technology: "IoT-based disease monitoring (for papaya ringspot virus), precision irrigation, and AI-driven pest control optimize yield and quality."
        },
        images: [
            "/crops/papaya1.jpeg", // Image 1
            "/crops/papaya2.webp", // Image 2
            "/crops/papaya3.jpeg"   // Image 3
        ]
    },
    orange: {
        name: "Orange",
        type: "Fruit crop (Grown for fresh consumption, juice production, and essential oils)",
        benefits: [
            "Nutritional: High in vitamin C, antioxidants, and fiber.",
            "Economic: Major cash crop with high demand in juice and food processing industries.",
            "Health: Supports immunity, heart health, and skin health."
        ],
        insights: {
            soil: "Well-drained sandy loam or loamy soil with good organic content.",
            pH: "5.5–7.0 (slightly acidic to neutral).",
            irrigation: "Requires moderate but regular watering, with drip irrigation preferred to prevent water stress.",
            temperature: "13–38°C (thrives in subtropical and Mediterranean climates).",
            fertilization: "Needs nitrogen (N), phosphorus (P), potassium (K), calcium (Ca), and magnesium (Mg) for good fruit quality.",
            technology: "AI-based pest detection (for citrus greening disease), soil moisture sensors, and precision irrigation systems enhance yield and fruit quality."
        },
        images: [
            "/crops/orange1.jpeg", // Image 1
            "/crops/orange2.jpeg", // Image 2
            "/crops/orange3.jpeg"   // Image 3
        ]
    },
    apple: {
        name: "Apple",
        type: "Fruit crop (Grown for fresh consumption, juice, and processed products)",
        benefits: [
            "Nutritional: Rich in fiber, vitamin C, and antioxidants.",
            "Economic: High-value crop with strong market demand.",
            "Health: Supports heart health, digestion, and immunity."
        ],
        insights: {
            soil: "Well-drained loamy or sandy loam soil with good organic matter.",
            pH: "6.0–7.0 (slightly acidic to neutral).",
            irrigation: "Requires moderate irrigation, with drip irrigation preferred to maintain consistent moisture.",
            temperature: "21–24°C (thrives in temperate climates with cold winters for dormancy).",
            fertilization: "Needs nitrogen (N), phosphorus (P), potassium (K), calcium (Ca), and boron (B) for high-quality fruit.",
            technology: "Drone-based disease detection (for apple scab and fire blight), smart irrigation systems, and AI-driven pest control (for codling moths) improve productivity."
        },
        images: [
            "/crops/apple1.jpeg", // Image 1
            "/crops/apple2.jpeg", // Image 2
            "/crops/apple3.jpeg"   // Image 3
        ]
    },
    muskmelon: {
        name: "Muskmelon",
        type: "Fruit crop (Grown for fresh consumption, juices, and desserts)",
        benefits: [
            "Nutritional: High in vitamins A & C, antioxidants, and hydration.",
            "Economic: Fast-growing cash crop with high market demand.",
            "Health: Supports hydration, digestion, and immunity."
        ],
        insights: {
            soil: "Well-drained sandy loam or loamy soil with high organic content.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires moderate but consistent watering, especially during flowering and fruiting; drip irrigation is ideal.",
            temperature: "25–35°C (thrives in warm, dry climates).",
            fertilization: "Needs nitrogen (N), phosphorus (P), potassium (K), and magnesium (Mg) for better fruit yield and sweetness.",
            technology: "IoT-based irrigation control, AI-powered pest monitoring (for aphids and powdery mildew), and smart fertigation systems improve quality and yield."
        },
        images: [
            "/crops/muskmelon1.jpeg", // Image 1
            "/crops/muskmelon2.webp", // Image 2
            "/crops/muskmelon3.jpeg"   // Image 3
        ]
    },
    watermelon: {
        name: "Watermelon",
        type: "Fruit crop (Grown for fresh consumption and juice production)",
        benefits: [
            "Nutritional: High in water content (90%), vitamins A & C, and antioxidants.",
            "Economic: Profitable cash crop with high market demand.",
            "Health: Supports hydration, heart health, and digestion."
        ],
        insights: {
            soil: "Well-drained sandy loam or loamy soil with good organic matter.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires moderate but consistent watering, especially during fruit formation; drip irrigation prevents waterlogging.",
            temperature: "24–35°C (thrives in warm, dry climates).",
            fertilization: "Needs high potassium (K) and phosphorus (P) for sweeter and larger fruits, along with moderate nitrogen (N).",
            technology: "AI-based pest control (for aphids and fruit flies), soil moisture sensors, and precision fertigation optimize yield and fruit quality."
        },
        images: [
            "/crops/watermelon1.jpeg", // Image 1
            "/crops/watermelon2.webp", // Image 2
            "/crops/watermelon3.jpeg"   // Image 3
        ]
    },
    grapes: {
        name: "Grapes",
        type: "Fruit crop (Used for fresh consumption, wine production, and dried as raisins)",
        benefits: [
            "Nutritional: Rich in antioxidants, vitamins C & K, and resveratrol (supports heart health).",
            "Economic: High-value cash crop for fresh markets, winemaking, and dried fruit industries.",
            "Health: Supports heart health, digestion, and skin health."
        ],
        insights: {
            soil: "Well-drained sandy loam or clay loam with good organic matter.",
            pH: "5.5–7.0 (slightly acidic to neutral).",
            irrigation: "Requires low to moderate irrigation, with drip irrigation preferred to avoid excessive moisture.",
            temperature: "15–35°C (thrives in Mediterranean and temperate climates).",
            fertilization: "Needs high potassium (K) and phosphorus (P), moderate nitrogen (N), and calcium (Ca) for better fruit quality.",
            technology: "AI-driven disease detection (for powdery mildew and downy mildew), smart irrigation systems, and drone-based monitoring optimize yield and grape quality."
        },
        images: [
            "/crops/grapes1.jpeg", // Image 1
            "/crops/grapes2.jpeg", // Image 2
            "/crops/grapes3.jpeg"   // Image 3
        ]
    },
    mango: {
        name: "Mango",
        type: "Fruit crop (Grown for fresh consumption, juice, pickles, and processed products)",
        benefits: [
            "Nutritional: Rich in vitamins A, C, and antioxidants.",
            "Economic: High-value export crop with strong demand in domestic and international markets.",
            "Health: Supports immunity, digestion, and skin health."
        ],
        insights: {
            soil: "Well-drained loamy or sandy loam soil with good organic matter.",
            pH: "5.5–7.5 (slightly acidic to neutral).",
            irrigation: "Requires low to moderate irrigation; drip irrigation is recommended during flowering and fruit development.",
            temperature: "24–38°C (thrives in tropical and subtropical climates).",
            fertilization: "Needs nitrogen (N), phosphorus (P), potassium (K), and micronutrients like zinc (Zn) and boron (B) for fruit quality.",
            technology: "AI-powered pest monitoring (for mango hopper and fruit fly), drone-based disease detection, and precision irrigation systems enhance yield and fruit quality."
        },
        images: [
            "/crops/mango1.webp", // Image 1
            "/crops/mango2.jpeg", // Image 2
            "/crops/mango3.jpeg"   // Image 3
        ]
    },
    banana: {
        name: "Banana",
        type: "Fruit crop (Grown for fresh consumption, processed foods, and fiber production)",
        benefits: [
            "Nutritional: Rich in potassium, fiber, and vitamins B6 & C.",
            "Economic: High-yield, fast-growing cash crop with year-round production.",
            "Health: Supports digestion, heart health, and energy levels."
        ],
        insights: {
            soil: "Well-drained loamy or alluvial soil with high organic matter.",
            pH: "5.5–7.0 (slightly acidic to neutral).",
            irrigation: "Requires frequent irrigation, with drip irrigation preferred to maintain moisture without waterlogging.",
            temperature: "25–35°C (thrives in warm, humid tropical climates).",
            fertilization: "Needs high nitrogen (N), phosphorus (P), potassium (K), and calcium (Ca) for good fruit quality.",
            technology: "AI-powered disease detection (for Panama wilt and banana bunchy top virus), IoT-based irrigation management, and tissue culture propagation improve yield and disease resistance."
        },
        images: [
            "/crops/banana1.jpeg", // Image 1
            "/crops/banana2.webp", // Image 2
            "/crops/banana3.jpeg"   // Image 3
        ]
    },
    pomegranate: {
        name: "Pomegranate",
        type: "Fruit crop (Grown for fresh consumption, juice production, and medicinal use)",
        benefits: [
            "Nutritional: Rich in antioxidants, vitamins C & K, and fiber.",
            "Economic: High-value cash crop with strong demand in domestic and export markets.",
            "Health: Supports heart health, immunity, and anti-inflammatory benefits."
        ],
        insights: {
            soil: "Well-drained sandy loam or loamy soil with good organic content.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires low to moderate irrigation, with drip irrigation recommended to prevent waterlogging.",
            temperature: "25–35°C (thrives in arid and semi-arid climates, drought-tolerant).",
            fertilization: "Needs high potassium (K) and phosphorus (P), moderate nitrogen (N), and micronutrients like zinc (Zn) and boron (B).",
            technology: "AI-based pest monitoring (for fruit borer and aphids), precision fertigation, and drone-based disease detection (for bacterial blight and fungal infections) optimize yield and fruit quality."
        },
        images: [
            "/crops/pomegranate1.jpeg", // Image 1
            "/crops/pomegranate2.webp", // Image 2
            "/crops/pomegranate3.webp"   // Image 3
        ]
    },
    lentil: {
        name: "Lentil",
        type: "Pulse crop (Legume grown for edible seeds, used in food and animal feed)",
        benefits: [
            "Nutritional: High in protein, fiber, iron, and essential amino acids.",
            "Economic: Cost-effective and widely cultivated for human consumption and fodder.",
            "Soil Health: Improves soil fertility by fixing atmospheric nitrogen."
        ],
        insights: {
            soil: "Well-drained loamy or clay loam soil with good organic matter.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires low irrigation; sensitive to waterlogging, prefers rainfed conditions.",
            temperature: "15–25°C (cool-season crop, tolerates mild frost).",
            fertilization: "Requires low nitrogen (N) (due to nitrogen fixation), moderate phosphorus (P), and potassium (K) for optimal growth.",
            technology: "AI-based pest detection (for aphids and lentil rust), precision sowing techniques, and moisture sensors improve yield and disease resistance."
        },
        images: [
            "/crops/lentil1.jpeg", // Image 1
            "/crops/lentil2.avif", // Image 2
            "/crops/lentil3.jpeg"   // Image 3
        ]
    },
    blackgram: {
        name: "Blackgram",
        type: "Pulse crop (Legume grown for edible seeds, used in food and fodder)",
        benefits: [
            "Nutritional: High in protein, fiber, iron, and essential amino acids.",
            "Economic: Valuable cash crop used in various cuisines (e.g., dal, idli, dosa).",
            "Soil Health: Fixes atmospheric nitrogen, improving soil fertility."
        ],
        insights: {
            soil: "Well-drained loamy or clay loam soil with good organic content.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires low to moderate irrigation; sensitive to waterlogging, best suited for rainfed conditions.",
            temperature: "25–35°C (thrives in warm climates, tolerates dry conditions).",
            fertilization: "Requires low nitrogen (N) (due to nitrogen fixation), moderate phosphorus (P), and potassium (K).",
            technology: "AI-powered pest control (for pod borer and aphids), precision sowing techniques, and soil moisture sensors enhance yield and disease resistance."
        },
        images: [
            "/crops/blackgram1.jpeg", // Image 1
            "/crops/blackgram2.webp", // Image 2
            "/crops/blackgram3.jpeg"   // Image 3
        ]
    },
    mungbean: {
        name: "Mungbean",
        type: "Pulse crop (Legume grown for edible seeds, sprouts, and fodder)",
        benefits: [
            "Nutritional: High in protein, fiber, vitamins, and antioxidants.",
            "Economic: Fast-growing cash crop with high demand in food and sprouting industries.",
            "Soil Health: Improves soil fertility by fixing atmospheric nitrogen."
        ],
        insights: {
            soil: "Well-drained loamy or sandy loam soil with good organic matter.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires low to moderate irrigation; sensitive to waterlogging, best suited for rainfed conditions.",
            temperature: "25–35°C (thrives in warm, dry climates).",
            fertilization: "Requires low nitrogen (N) (due to nitrogen fixation), moderate phosphorus (P), and potassium (K) for good yield.",
            technology: "AI-powered pest control (for thrips and aphids), precision sowing techniques, and soil moisture sensors improve productivity and disease resistance."
        },
        images: [
            "/crops/mungbean1.jpeg", // Image 1
            "/crops/mungbean2.jpeg", // Image 2
            "/crops/mungbean3.webp"   // Image 3
        ]
    },
    mothbeans: {
        name: "Mothbean",
        type: "Pulse crop (Drought-resistant legume grown for edible seeds and fodder)",
        benefits: [
            "Nutritional: High in protein, fiber, iron, and essential amino acids.",
            "Economic: Grown in arid regions with minimal water requirements, making it a profitable crop.",
            "Soil Health: Improves soil fertility by fixing atmospheric nitrogen."
        ],
        insights: {
            soil: "Well-drained sandy loam or light-textured soil with good drainage.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires minimal irrigation; highly drought-tolerant, best suited for dryland farming.",
            temperature: "25–40°C (thrives in hot, arid climates).",
            fertilization: "Requires low nitrogen (N) (due to nitrogen fixation), moderate phosphorus (P), and potassium (K) for better yield.",
            technology: "AI-powered pest control (for aphids and pod borers), satellite-based soil moisture monitoring, and precision sowing techniques improve yield and sustainability."
        },
        images: [
            "/crops/mothbean1.jpeg", // Image 1
            "/crops/mothbean2.jpeg", // Image 2
            "/crops/mothbean3.webp"   // Image 3
        ]
    },
    kidneybeans: {
        name: "Kidney Bean",
        type: "Pulse crop (Legume grown for edible seeds, used in various cuisines)",
        benefits: [
            "Nutritional: High in protein, fiber, iron, and antioxidants.",
            "Economic: Profitable cash crop with high demand in food industries.",
            "Soil Health: Fixes atmospheric nitrogen, improving soil fertility."
        ],
        insights: {
            soil: "Well-drained loamy or clay loam soil with high organic matter.",
            pH: "6.0–7.5 (neutral to slightly acidic).",
            irrigation: "Requires moderate irrigation, especially during flowering and pod formation; drip irrigation prevents water stress.",
            temperature: "18–30°C (thrives in mild, warm climates).",
            fertilization: "Requires low nitrogen (N) (due to nitrogen fixation), moderate phosphorus (P), potassium (K), and calcium (Ca) for optimal yield.",
            technology: "AI-powered pest monitoring (for aphids and whiteflies), precision irrigation systems, and drone-based disease detection (for bacterial blight and rust) improve yield and crop health."
        },
        images: [
            "/crops/kidneybean1.webp", // Image 1
            "/crops/kidneybean2.jpeg", // Image 2
            "/crops/kidneybean3.jpeg"   // Image 3
        ]
    },
    chickpea: {
        name: "Chickpea",
        type: "Pulse crop (Legume grown for edible seeds, used in food and animal feed)",
        benefits: [
            "Nutritional: High in protein, fiber, iron, and essential amino acids.",
            "Economic: Important cash crop with high demand in food industries (e.g., flour, hummus, snacks).",
            "Soil Health: Fixes atmospheric nitrogen, improving soil fertility."
        ],
        insights: {
            soil: "Well-drained loamy or sandy loam soil with good organic matter.",
            pH: "6.0–8.0 (neutral to slightly alkaline).",
            irrigation: "Requires low irrigation, mostly rainfed; overwatering can cause root rot.",
            temperature: "15–30°C (thrives in cool-season conditions, drought-tolerant).",
            fertilization: "Requires low nitrogen (N) (due to nitrogen fixation), moderate phosphorus (P), and potassium (K) for healthy growth.",
            technology: "AI-based pest monitoring (for pod borers and aphids), precision sowing techniques, and moisture sensors optimize yield and disease resistance."
        },
        images: [
            "/crops/chickpea1.jpeg", // Image 1
            "/crops/chickpea2.avif", // Image 2
            "/crops/chickpea3.webp"   // Image 3
        ]
    }
};

export default allCrops;