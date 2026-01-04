import React, { useEffect, useState } from "react";
import { listFood } from "../utils/Api";
import FoodCard from "./FoodCard";
import { motion } from "framer-motion";

const categories = ["All", "Main", "Sides", "Snacks", "Drinks"];

function FoodHome() {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  //time to fix this up


  useEffect(() => {
    loadFood();
  }, []);

  function loadFood() {
    listFood()
      .then(setMenuItems)
      .then(() => setLoading(false));
  }

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  if (loading) {
    return <div className="text-center text-white py-20">Loading menu...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center px-6 py-12"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Crect fill='%23ff9d00' width='1600' height='800'/%3E%3Cg stroke='%23000' stroke-width='73.9' stroke-opacity='0.05'%3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fb8d17' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23f47d24' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ed6e2d' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23e35f34' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23d85239' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23cc453e' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23be3941' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23b02f43' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a02644' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23901e44' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23801843' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%236f1341' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%235e0f3d' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%234e0c38' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%233e0933' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%232e062c' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD93D]/70 to-[#FF6F61]/70 mix-blend-multiply"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-4xl font-bold text-center text-white drop-shadow-lg mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🍔 Game Fuel Menu 🍟
        </motion.h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all 
                ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/30 text-white hover:bg-white/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((food) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FoodCard food={food} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodHome;