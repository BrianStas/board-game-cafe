import { useEffect, useState } from "react";
import { listGames } from "../utils/Api";
import SearchBar from "../layout/SearchBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

//TODO: Find new button formats and real design elements

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [boardGames, setBoardGames] = useState([]);

  useEffect(() => {
    listGames()
      .then(setBoardGames)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl font-bold">Loading games...</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD93D]/80 to-[#6C63FF]/80 mix-blend-multiply"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 p-10 backdrop-blur-md bg-white/20 rounded-2xl shadow-xl text-center max-w-2xl"
      >
        <motion.h1
          className="text-5xl font-extrabold text-white drop-shadow-md mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎲 Welcome to The Action Phase!
        </motion.h1>

        <motion.p
          className="text-lg text-white mb-8 drop-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          For a game leader, please ring the bell on your table!
        </motion.p>

        <SearchBar games={boardGames} />

        <div className="mt-10 flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 1 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate(`/boardgames`)}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-4 px-6 rounded-xl shadow-md"
          >
            🎮 Game Library
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: -1 }}
            whileTap={{ scale: 0.95, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate(`/food`)}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-md"
          >
            🍔 Order Food
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}