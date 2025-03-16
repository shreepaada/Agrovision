"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-green-500 font-medium">
          Agro Vision - Precision farming
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Transforming Agriculture with AI
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Leverage satellite imagery and machine learning to optimize crop selection, soil health, and yield prediction.
        </p>
        <button className="bg-green-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-green-600 active:scale-95">
          Explore Insights
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://i.unu.edu/media/ourworld.unu.edu-en/article/5379/SRI-hybrid-rice-field.jpg",
  },
  {
    id: 2,
    src: "https://static.vecteezy.com/system/resources/thumbnails/040/970/457/small_2x/agriculture-nature-and-agricultural-crops-grown-in-the-field-a-field-with-sprouted-wheat-and-rye-video.jpg",
  },
  {
    id: 3,
    src: "https://sgtuniversity.ac.in/assets/images/faculty/agricultural-science/blogs/Importance-of-Horticulture.webp",
  },
  {
    id: 4,
    src: "https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/golden-wheat-grass.cdn.en.2.jpg?fit=crop&auto=format&crop=focalpoint&fp-x=0.35&fp-y=0.6&fp-z=1&w=645&h=403",
  },
  {
    id: 5,
    src: "https://www.trenpa.in/cdn/shop/articles/sorghum-stalk-in-a-field.webp?v=1735914755&width=1100",
  },
  {
    id: 6,
    src: "https://stories.ecmwf.int/global-crop-monitoring/assets/PEcS0gbyCa/corn-and-sun-sbi-300792643-4096x2720.jpeg",
  },
  {
    id: 7,
    src: "https://track2training.com/wp-content/uploads/2023/02/agriculture.jpg",
  },
  {
    id: 8,
    src: "https://www.kfertslab.com/blog/wp-content/uploads/2023/06/cn-305-banner-1140x640-1.jpg",
  },
  {
    id: 9,
    src: "https://www.villagesquare.in/wp-content/uploads/2019/05/Wish02.jpg",
  },
  {
    id: 10,
    src: "https://leica-geosystems.com/-/media/images/leicageosystems/industries/thumbnails%20800x428/agriculture_portfolio_leica_geosystems_800x428.ashx?h=428&iar=0&w=800&hash=6D5D8612062B8A10A70F63AFD2E950AF",
  },
  {
    id: 11,
    src: "https://cdn.shopify.com/s/files/1/0874/2934/9685/files/list-of-10-benefits-supporting-the-importance-of-agriculture-to-the-nation-and-community-1.webp?v=1729885359",
  },
  {
    id: 12,
    src: "https://www.dahu.bio/images/photos/agriculture/agriculture.jpg",
  },
  {
    id: 13,
    src: "https://world-coal-assets.s3.eu-west-1.amazonaws.com/wp-content/uploads/2023/12/17130044/agriculture-1.png",
  },
  {
    id: 14,
    src: "https://indiaforensic.com/certifications/wp-content/uploads/2017/01/agriculture.jpg",
  },
  {
    id: 15,
    src: "https://static.wixstatic.com/media/681109_ed1d6c95401f43509d433f66388a41e4~mv2.png/v1/fill/w_568,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/681109_ed1d6c95401f43509d433f66388a41e4~mv2.png",
  },
  {
    id: 16,
    src: "https://www.syngenta.com/sites/default/files/styles/s_c_705x440/public/2024-11/Print_Agriculture%20field%20at%20sunset%2C%20green%20wheat%20and%20soil.jpg.webp?itok=AfF15nCV"  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Dashboard;